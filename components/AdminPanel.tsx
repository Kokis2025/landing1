import React, { useState, useEffect } from 'react';
import { initialContent, Section, predefinedSchemes, PredefinedScheme } from '../content';
import { supabase } from '../supabaseClient';

// --- Icon Components ---
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const ChevronUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const PaintBrushIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;

// Helper for file uploads to Supabase Storage
const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    try {
        const { error: uploadError } = await supabase.storage
            .from('landing-images')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('landing-images')
            .getPublicUrl(filePath);

        if (!data || !data.publicUrl) {
            throw new Error("No se pudo obtener la URL pública del archivo.");
        }
        
        callback(data.publicUrl);
    } catch (error) {
        console.error('Error uploading file:', error);
        let alertMessage = `Error al subir la imagen: ${error instanceof Error ? error.message : 'Error desconocido.'}`;
        if (error instanceof Error && error.message.toLowerCase().includes('security policy')) {
            alertMessage = 'Error de Permisos al Subir Imagen.\n\nLa política de seguridad de Supabase no permite esta acción. Por favor, sigue las instrucciones de "ALMACENAMIENTO (STORAGE)" en el archivo `supabaseClient.ts` para configurar los permisos correctos usando el Editor de SQL.';
        } else if (error instanceof Error && error.message.toLowerCase().includes('bucket not found')) {
            alertMessage = 'Error: Bucket no encontrado.\n\nEl bucket de almacenamiento "landing-images" no existe. Sigue las instrucciones en `supabaseClient.ts` para crearlo.';
        }
        alert(alertMessage);
    }
};

// --- Form Components ---
const TextInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
        <input type="text" value={value} onChange={onChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>
);
const ColorInput: React.FC<{ label: string; value: string; onChange: (color: string) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
        <div className="flex items-center gap-2 p-2 border border-stone-300 rounded-lg bg-white">
            <div className="relative w-8 h-8 rounded-md overflow-hidden border border-stone-200">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full font-mono text-sm tracking-wider focus:outline-none"
            />
        </div>
    </div>
);


const NumberInput: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; min?: number; max?: number }> = ({ label, value, onChange, min, max }) => (
    <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
        <input type="number" value={value} onChange={onChange} min={min} max={max} className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>
);


const TextareaInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
        <textarea value={value} onChange={onChange} rows={3} className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>
);

const ImageInput: React.FC<{ label: string; imageUrl: string; onImageChange: (url: string) => void }> = ({ label, imageUrl, onImageChange }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            await handleFileUpload(file, (url) => {
                onImageChange(url);
                setIsUploading(false);
            });
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img src={imageUrl} alt="Actual" className="w-20 h-20 object-contain rounded-md bg-stone-100 border" />
                <div className="flex-grow w-full">
                    {isUploading ? (
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                            <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Subiendo...</span>
                        </div>
                    ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={isUploading}
                            className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                    )}
                    <p className="text-xs text-stone-400 mt-1">Sube una imagen para reemplazar la actual.</p>
                </div>
            </div>
        </div>
    );
};


const ToggleSwitch: React.FC<{ label: string, checked: boolean; onChange: (checked: boolean) => void }> = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-stone-700">{label}</label>
        <button
            type="button"
            className={`${
                checked ? 'bg-indigo-600' : 'bg-stone-300'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
        >
            <span
                className={`${
                    checked ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
        </button>
    </div>
);


// --- Section Editors ---

const SectionEditor: React.FC<{ section: Section; children: React.ReactNode }> = ({ section, children }) => {
     return (
        <div className="space-y-6 p-4 sm:p-6 bg-stone-50 rounded-lg border">
            <h3 className="text-xl font-bold text-stone-900">{section.name}</h3>
            {children}
        </div>
    );
};

const editors: { [key: string]: React.FC<{ section: Section; onUpdate: (newProps: any) => void }> } = {
    Header: ({ section, onUpdate }) => (
        <SectionEditor section={section}>
            <TextInput label="Título de la Página" value={section.props.pageTitle} onChange={e => onUpdate({ ...section.props, pageTitle: e.target.value })} />
            <ImageInput label="Logo" imageUrl={section.props.logoUrl} onImageChange={url => onUpdate({ ...section.props, logoUrl: url })} />
        </SectionEditor>
    ),
    Hero: ({ section, onUpdate }) => (
        <SectionEditor section={section}>
            <TextInput label="Título" value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
            <TextareaInput label="Subtítulo" value={section.props.subtitle} onChange={e => onUpdate({ ...section.props, subtitle: e.target.value })} />
            <TextInput label="Texto del Botón" value={section.props.ctaButtonText} onChange={e => onUpdate({ ...section.props, ctaButtonText: e.target.value })} />
            <TextInput label="Enlace del Botón" value={section.props.ctaButtonLink} onChange={e => onUpdate({ ...section.props, ctaButtonLink: e.target.value })} />
            <ToggleSwitch label="Mostrar Botón de Acción" checked={section.props.isCtaButtonVisible} onChange={val => onUpdate({ ...section.props, isCtaButtonVisible: val })} />
            <ImageInput label="Imagen Izquierda (Fondo)" imageUrl={section.props.leftImageUrl} onImageChange={url => onUpdate({ ...section.props, leftImageUrl: url })} />
            <ImageInput label="Imagen Derecha (Principal)" imageUrl={section.props.rightImageUrl} onImageChange={url => onUpdate({ ...section.props, rightImageUrl: url })} />
        </SectionEditor>
    ),
    About: ({ section, onUpdate }) => (
        <SectionEditor section={section}>
            <ImageInput label="Icono de Sección (3D)" imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
            <TextInput label="Título" value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
            <TextareaInput label="Párrafo 1" value={section.props.paragraph1} onChange={e => onUpdate({ ...section.props, paragraph1: e.target.value })} />
            <TextareaInput label="Párrafo 2" value={section.props.paragraph2} onChange={e => onUpdate({ ...section.props, paragraph2: e.target.value })} />
            <ImageInput label="Imagen de la Firma" imageUrl={section.props.signatureImgUrl} onImageChange={url => onUpdate({ ...section.props, signatureImgUrl: url })} />
            <ImageInput label="Imagen del Autor (con Capi y Hely)" imageUrl={section.props.aboutImageUrl} onImageChange={url => onUpdate({ ...section.props, aboutImageUrl: url })} />
            <TextInput label="Pie de foto (nombre de personajes)" value={section.props.characterName} onChange={e => onUpdate({ ...section.props, characterName: e.target.value })} />
        </SectionEditor>
    ),
    Books: ({ section, onUpdate }) => {
        const handleSectionTitleChange = (sectionIndex: number, value: string) => {
            const newBookSections = [...section.props.bookSections];
            newBookSections[sectionIndex].title = value;
            onUpdate({ ...section.props, bookSections: newBookSections });
        };
    
        const addBookSection = () => {
            const newBookSections = [...section.props.bookSections, { id: Date.now(), title: 'Nueva Sección', books: [] }];
            onUpdate({ ...section.props, bookSections: newBookSections });
        };
    
        const removeBookSection = (sectionIndex: number) => {
            const newBookSections = section.props.bookSections.filter((_: any, i: number) => i !== sectionIndex);
            onUpdate({ ...section.props, bookSections: newBookSections });
        };
    
        const handleBookChange = (sectionIndex: number, bookIndex: number, field: string, value: string | number) => {
            const newBookSections = [...section.props.bookSections];
            newBookSections[sectionIndex].books[bookIndex] = { ...newBookSections[sectionIndex].books[bookIndex], [field]: value };
            onUpdate({ ...section.props, bookSections: newBookSections });
        };
    
        const handleBookImageChange = (sectionIndex: number, bookIndex: number, url: string) => {
            const newBookSections = [...section.props.bookSections];
            newBookSections[sectionIndex].books[bookIndex].imageUrl = url;
            onUpdate({ ...section.props, bookSections: newBookSections });
        };
    
        const addBook = (sectionIndex: number) => {
            const newBookSections = [...section.props.bookSections];
            const newBook = { id: Date.now(), title: 'Nuevo Libro', link: '#', store: 'Amazon', imageUrl: 'https://i.imgur.com/gK2x3nB.jpeg', rating: 5, backsideDescription: 'Añade una descripción aquí.' };
            newBookSections[sectionIndex].books.push(newBook);
            onUpdate({ ...section.props, bookSections: newBookSections });
        };
    
        const removeBook = (sectionIndex: number, bookIndex: number) => {
            const newBookSections = [...section.props.bookSections];
            newBookSections[sectionIndex].books = newBookSections[sectionIndex].books.filter((_: any, i: number) => i !== bookIndex);
            onUpdate({ ...section.props, bookSections: newBookSections });
        };
    
        return (
            <SectionEditor section={section}>
                <ImageInput label="Icono de Sección (3D)" imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
                <TextInput label="Título Principal de la Sección" value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
                
                <h4 className="text-md font-bold text-stone-700 pt-4 mt-6 border-t">Categorías de Libros</h4>
                <div className="space-y-6">
                    {section.props.bookSections?.map((bookSection: any, sectionIndex: number) => (
                        <div key={bookSection.id} className="p-4 border-2 border-stone-200 rounded-lg bg-white space-y-4">
                            <div className="flex justify-between items-center gap-4 pb-4 border-b">
                                <TextInput label="Título de Categoría" value={bookSection.title} onChange={e => handleSectionTitleChange(sectionIndex, e.target.value)} />
                                <button onClick={() => removeBookSection(sectionIndex)} className="mt-6 text-red-600 hover:text-red-800 text-sm font-semibold whitespace-nowrap">Eliminar Categoría</button>
                            </div>
                            
                            {bookSection.books.map((book: any, bookIndex: number) => (
                                <div key={book.id} className="p-4 border rounded-lg bg-stone-50 space-y-4">
                                    <TextInput label="Título del Libro" value={book.title} onChange={e => handleBookChange(sectionIndex, bookIndex, 'title', e.target.value)} />
                                    <TextInput label="URL de la Tienda" value={book.link} onChange={e => handleBookChange(sectionIndex, bookIndex, 'link', e.target.value)} />
                                    <TextInput label="Nombre de la Tienda" value={book.store} onChange={e => handleBookChange(sectionIndex, bookIndex, 'store', e.target.value)} />
                                    <NumberInput label="Calificación (0-5)" value={book.rating} onChange={e => handleBookChange(sectionIndex, bookIndex, 'rating', parseInt(e.target.value, 10))} min={0} max={5} />
                                    <TextareaInput label="Descripción de la Contraportada" value={book.backsideDescription} onChange={e => handleBookChange(sectionIndex, bookIndex, 'backsideDescription', e.target.value)} />
                                    <ImageInput label="Portada del Libro" imageUrl={book.imageUrl} onImageChange={url => handleBookImageChange(sectionIndex, bookIndex, url)} />
                                    <button onClick={() => removeBook(sectionIndex, bookIndex)} className="mt-2 text-red-600 hover:text-red-800 text-sm font-semibold">Eliminar Libro</button>
                                </div>
                            ))}
                             <button onClick={() => addBook(sectionIndex)} className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm text-sm">Añadir Libro a "{bookSection.title}"</button>
                        </div>
                    ))}
                </div>
                <button onClick={addBookSection} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">Añadir Categoría de Libros</button>
            </SectionEditor>
        );
    },
     Video: ({ section, onUpdate }) => (
         <SectionEditor section={section}>
             <ImageInput label="Icono de Sección (3D)" imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
             <TextInput label="Título" value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
             <TextareaInput label="Descripción" value={section.props.description} onChange={e => onUpdate({ ...section.props, description: e.target.value })} />
             <TextInput label="ID del Video de YouTube" value={section.props.videoId} onChange={e => onUpdate({ ...section.props, videoId: e.target.value })} />
        </SectionEditor>
    ),
    Benefits: ({ section, onUpdate }) => {
        const handleItemChange = (index: number, field: string, value: string) => {
            const newItems = [...section.props.items];
            newItems[index] = { ...newItems[index], [field]: value };
            onUpdate({ ...section.props, items: newItems });
        };
    
        const addItem = () => {
            const newItems = [...section.props.items, { id: Date.now(), icon: 'Heart', title: "Nuevo Beneficio", description: "Añade una descripción aquí." }];
            onUpdate({ ...section.props, items: newItems });
        };
    
        const removeItem = (index: number) => {
            const newItems = section.props.items.filter((_: any, i: number) => i !== index);
            onUpdate({ ...section.props, items: newItems });
        };
    
        return (
            <SectionEditor section={section}>
                <ImageInput label="Icono de Sección (3D)" imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
                <TextInput label="Título" value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
                
                <h4 className="text-md font-bold text-stone-700 pt-4 mt-6 border-t">Ítems de Beneficios</h4>
                <div className="space-y-6">
                    {section.props.items.map((item: any, index: number) => (
                        <div key={item.id} className="p-4 border rounded-lg bg-white space-y-4">
                            <TextInput label="Título del Beneficio" value={item.title} onChange={e => handleItemChange(index, 'title', e.target.value)} />
                            <TextareaInput label="Descripción" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} />
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Icono</label>
                                <select 
                                    value={item.icon} 
                                    onChange={e => handleItemChange(index, 'icon', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                >
                                    <option value="Heart">Corazón (Lectura Consciente)</option>
                                    <option value="Leaf">Hoja (Relajación)</option>
                                    <option value="Users">Usuarios (Conexión Familiar)</option>
                                    <option value="Badge">Insignia (Recomendado)</option>
                                </select>
                            </div>
                            <button onClick={() => removeItem(index)} className="mt-2 text-red-600 hover:text-red-800 text-sm font-semibold">Eliminar Beneficio</button>
                        </div>
                    ))}
                </div>
                <button onClick={addItem} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">Añadir Beneficio</button>
            </SectionEditor>
        );
    },
    Bonus: ({ section, onUpdate }) => {
        const handleImageChange = (index: number, url: string) => {
            const newImageUrls = [...section.props.imageUrls];
            newImageUrls[index] = url;
            onUpdate({ ...section.props, imageUrls: newImageUrls });
        };

        const addImage = () => {
            const newImageUrls = [...section.props.imageUrls, 'https://i.imgur.com/sC22J4s.png'];
            onUpdate({ ...section.props, imageUrls: newImageUrls });
        };

        const removeImage = (index: number) => {
            const newImageUrls = section.props.imageUrls.filter((_: any, i: number) => i !== index);
            onUpdate({ ...section.props, imageUrls: newImageUrls });
        };

        return (
            <SectionEditor section={section}>
                <ImageInput label="Icono de Sección (3D)" imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
                <TextInput label="Tag" value={section.props.tag} onChange={e => onUpdate({ ...section.props, tag: e.target.value })} />
                <TextInput label="Título" value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
                <TextareaInput label="Descripción" value={section.props.description} onChange={e => onUpdate({ ...section.props, description: e.target.value })} />
                <ColorInput label="Inicio del Degradado" value={section.props.cardGradientStart} onChange={c => onUpdate({ ...section.props, cardGradientStart: c })} />
                <ColorInput label="Fin del Degradado" value={section.props.cardGradientEnd} onChange={c => onUpdate({ ...section.props, cardGradientEnd: c })} />
                <ImageInput label="Icono de Tarjeta (esquina)" imageUrl={section.props.cardIconUrl} onImageChange={url => onUpdate({ ...section.props, cardIconUrl: url })} />

                <h4 className="text-md font-bold text-stone-700 pt-4 mt-6 border-t">Imágenes del Carrusel</h4>
                <div className="space-y-4">
                    {section.props.imageUrls.map((imageUrl: string, index: number) => (
                        <div key={index} className="p-4 border rounded-lg bg-white space-y-4">
                            <ImageInput label={`Imagen ${index + 1}`} imageUrl={imageUrl} onImageChange={url => handleImageChange(index, url)} />
                            <button onClick={() => removeImage(index)} className="text-red-600 hover:text-red-800 text-sm font-semibold">Eliminar Imagen</button>
                        </div>
                    ))}
                </div>
                <button onClick={addImage} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">Añadir Imagen</button>
            </SectionEditor>
        );
    },
    Testimonials: ({ section, onUpdate }) => {
        const handleItemChange = (index: number, field: string, value: string) => {
            const newItems = [...section.props.items];
            newItems[index] = { ...newItems[index], [field]: value };
            onUpdate({ ...section.props, items: newItems });
        };
        const handleItemImageChange = (index: number, url: string) => {
            const newItems = [...section.props.items];
            newItems[index] = { ...newItems[index], avatarUrl: url };
            onUpdate({ ...section.props, items: newItems });
        };
        const addItem = () => {
             const newItems = [...section.props.items, { id: Date.now(), quote: 'Añade una cita inspiradora.', author: 'Nombre del Autor', location: 'Ciudad, País', avatarUrl: 'https://i.imgur.com/O5t2n7g.jpeg' }];
             onUpdate({ ...section.props, items: newItems });
        };
        const removeItem = (index: number) => {
            const newItems = section.props.items.filter((_:any, i:number) => i !== index);
            onUpdate({ ...section.props, items: newItems });
        };
        return (
            <SectionEditor section={section}>
                <ImageInput label="Icono de Sección (3D)" imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
                <TextInput label="Título de la Sección" value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
                <h4 className="text-md font-bold text-stone-700 pt-4 mt-6 border-t">Testimonios</h4>
                <div className="space-y-6">
                    {section.props.items.map((item: any, index: number) => (
                        <div key={item.id} className="p-4 border rounded-lg bg-white space-y-4">
                             <TextareaInput label="Cita del Testimonio" value={item.quote} onChange={e => handleItemChange(index, 'quote', e.target.value)} />
                             <TextInput label="Autor" value={item.author} onChange={e => handleItemChange(index, 'author', e.target.value)} />
                             <TextInput label="Ubicación (ej: Ciudad, País)" value={item.location} onChange={e => handleItemChange(index, 'location', e.target.value)} />
                             <ImageInput label="Foto de Perfil (Avatar)" imageUrl={item.avatarUrl} onImageChange={url => handleItemImageChange(index, url)} />
                             <button onClick={() => removeItem(index)} className="mt-2 text-red-600 hover:text-red-800 text-sm font-semibold">Eliminar Testimonio</button>
                        </div>
                    ))}
                </div>
                <button onClick={addItem} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">Añadir Testimonio</button>
            </SectionEditor>
        );
    },
    Guarantee: ({ section, onUpdate }) => (
         <SectionEditor section={section}>
             <ImageInput label="Icono de Sección (3D)" imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
             <TextInput label="Título" value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
             <TextInput label="Cita" value={section.props.quote} onChange={e => onUpdate({ ...section.props, quote: e.target.value })} />
             <TextareaInput label="Descripción" value={section.props.description} onChange={e => onUpdate({ ...section.props, description: e.target.value })} />
        </SectionEditor>
    ),
    Faq: ({ section, onUpdate }) => {
        const props = section.props;
        const handleItemChange = (index: number, field: 'question' | 'answer', value: string) => {
            const newItems = [...props.items];
            newItems[index] = { ...newItems[index], [field]: value };
            onUpdate({ ...props, items: newItems });
        };
        const addItem = () => {
             const newItems = [...props.items, { id: Date.now(), question: 'Nueva Pregunta', answer: 'Añade la respuesta aquí.' }];
             onUpdate({ ...props, items: newItems });
        };
        const removeItem = (index: number) => {
            const newItems = props.items.filter((_:any, i:number) => i !== index);
            onUpdate({ ...props, items: newItems });
        };
        return (
            <SectionEditor section={section}>
                 <ImageInput label="Icono de Sección (3D)" imageUrl={props.iconUrl} onImageChange={url => onUpdate({ ...props, iconUrl: url })} />
                 <TextInput label="Título de la Sección" value={props.title} onChange={e => onUpdate({ ...props, title: e.target.value })} />
                 <h4 className="text-md font-bold text-stone-700 pt-4 mt-6 border-t">Preguntas y Respuestas</h4>
                 <div className="space-y-6">
                     {props.items.map((item: any, index: number) => (
                         <div key={item.id} className="p-4 border rounded-lg bg-white space-y-4">
                              <TextInput label="Pregunta" value={item.question} onChange={e => handleItemChange(index, 'question', e.target.value)} />
                              <TextareaInput label="Respuesta" value={item.answer} onChange={e => handleItemChange(index, 'answer', e.target.value)} />
                              <button onClick={() => removeItem(index)} className="mt-2 text-red-600 hover:text-red-800 text-sm font-semibold">Eliminar Pregunta</button>
                         </div>
                     ))}
                 </div>
                 <button onClick={addItem} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">Añadir Pregunta</button>
            </SectionEditor>
        );
    },
    Cta: ({ section, onUpdate }) => (
         <SectionEditor section={section}>
             <ImageInput label="Icono de Sección (3D)" imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
             <TextInput label="Título" value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
             <TextareaInput label="Descripción" value={section.props.description} onChange={e => onUpdate({ ...section.props, description: e.target.value })} />
             <TextInput label="Texto Botón Principal" value={section.props.primaryButtonText} onChange={e => onUpdate({ ...section.props, primaryButtonText: e.target.value })} />
             <TextInput label="Texto Botón Secundario" value={section.props.secondaryButtonText} onChange={e => onUpdate({ ...section.props, secondaryButtonText: e.target.value })} />
        </SectionEditor>
    ),
    Footer: ({ section, onUpdate }) => {
        const props = section.props;
    
        const handlePropChange = (propName: string, value: any) => {
            onUpdate({ ...props, [propName]: value });
        };
    
        const handleNestedPropChange = (topLevel: string, nested: string, value: any) => {
            handlePropChange(topLevel, { ...props[topLevel], [nested]: value });
        };
    
        const handleLinkListChange = (listName: 'quickLinks' | 'stores', index: number, field: 'text' | 'url', value: string) => {
            const newList = [...props[listName].links];
            newList[index] = { ...newList[index], [field]: value };
            handleNestedPropChange(listName, 'links', newList);
        };
    
        const addLink = (listName: 'quickLinks' | 'stores') => {
            const newList = [...props[listName].links, { id: Date.now(), text: 'Nuevo Enlace', url: '#' }];
            handleNestedPropChange(listName, 'links', newList);
        };
    
        const removeLink = (listName: 'quickLinks' | 'stores', index: number) => {
            const newList = props[listName].links.filter((_: any, i: number) => i !== index);
            handleNestedPropChange(listName, 'links', newList);
        };
    
        const handleSocialChange = (index: number, field: 'platform' | 'url', value: string) => {
            const newSocials = [...props.contact.social];
            newSocials[index] = { ...newSocials[index], [field]: value };
            handleNestedPropChange('contact', 'social', newSocials);
        };
    
        const addSocial = () => {
            const newSocials = [...props.contact.social, { id: Date.now(), platform: 'Instagram', url: '#' }];
            handleNestedPropChange('contact', 'social', newSocials);
        };
    
        const removeSocial = (index: number) => {
            const newSocials = props.contact.social.filter((_: any, i: number) => i !== index);
            handleNestedPropChange('contact', 'social', newSocials);
        };
    
        const LinkEditor: React.FC<{ listName: 'quickLinks' | 'stores' }> = ({ listName }) => (
            <div className="space-y-4 p-4 border rounded-lg bg-white">
                <TextInput 
                    label={`Título de "${props[listName].title}"`} 
                    value={props[listName].title} 
                    onChange={e => handleNestedPropChange(listName, 'title', e.target.value)} 
                />
                <div className="space-y-4">
                    {props[listName].links.map((link: any, index: number) => (
                        <div key={link.id} className="p-4 border rounded-lg bg-stone-50 space-y-3">
                            <TextInput label="Texto del Enlace" value={link.text} onChange={e => handleLinkListChange(listName, index, 'text', e.target.value)} />
                            <TextInput label="URL del Enlace" value={link.url} onChange={e => handleLinkListChange(listName, index, 'url', e.target.value)} />
                            <button onClick={() => removeLink(listName, index)} className="text-red-600 hover:text-red-800 text-sm font-semibold">Eliminar Enlace</button>
                        </div>
                    ))}
                </div>
                <button onClick={() => addLink(listName)} className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm text-sm">Añadir Enlace</button>
            </div>
        );
        
        return (
            <SectionEditor section={section}>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-md font-bold text-stone-700 mb-2">Enlaces Rápidos</h4>
                        <LinkEditor listName="quickLinks" />
                    </div>
                    <div className="pt-6 border-t">
                        <h4 className="text-md font-bold text-stone-700 mb-2">Tiendas</h4>
                        <LinkEditor listName="stores" />
                    </div>
                    <div className="pt-6 border-t">
                        <h4 className="text-md font-bold text-stone-700 mb-2">Contacto y Redes Sociales</h4>
                        <div className="space-y-4 p-4 border rounded-lg bg-white">
                            <TextInput label="Título de la sección" value={props.contact.title} onChange={e => handleNestedPropChange('contact', 'title', e.target.value)} />
                            <TextInput label="Email de Contacto" value={props.contact.email} onChange={e => handleNestedPropChange('contact', 'email', e.target.value)} />
                            <h5 className="text-sm font-bold text-stone-600 pt-2">Redes Sociales</h5>
                            <div className="space-y-4">
                                {props.contact.social.map((social: any, index: number) => (
                                    <div key={social.id} className="p-4 border rounded-lg bg-stone-50 space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-1">Plataforma</label>
                                            <select value={social.platform} onChange={e => handleSocialChange(index, 'platform', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                                <option value="Instagram">Instagram</option>
                                                <option value="Facebook">Facebook</option>
                                            </select>
                                        </div>
                                        <TextInput label="URL del Perfil" value={social.url} onChange={e => handleSocialChange(index, 'url', e.target.value)} />
                                        <button onClick={() => removeSocial(index)} className="text-red-600 hover:text-red-800 text-sm font-semibold">Eliminar Red Social</button>
                                    </div>
                                ))}
                            </div>
                             <button onClick={addSocial} className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm text-sm">Añadir Red Social</button>
                        </div>
                    </div>
                    <div className="pt-6 border-t">
                         <TextareaInput label="Texto de Copyright" value={props.copyrightText} onChange={e => handlePropChange('copyrightText', e.target.value)} />
                    </div>
                </div>
            </SectionEditor>
        );
    },
};

const SectionsManager: React.FC<{
    localContent: typeof initialContent;
    setLocalContent: React.Dispatch<React.SetStateAction<typeof initialContent>>;
    setEditingSectionId: (id: string | null) => void;
}> = ({ localContent, setLocalContent, setEditingSectionId }) => {

    const handleToggleVisibility = (sectionId: string) => {
        const newSections = localContent.sections.map(s => s.id === sectionId ? { ...s, isVisible: !s.isVisible } : s);
        setLocalContent({ ...localContent, sections: newSections });
    };

    const handleMoveSection = (index: number, direction: 'up' | 'down') => {
        const newSections = [...localContent.sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        
        // Prevent moving header/footer from their spots
        if (newSections[index].id === 'header' || newSections[index].id === 'footer' ||
            newSections[targetIndex].id === 'header' || newSections[targetIndex].id === 'footer') {
            return;
        }

        if (targetIndex < 0 || targetIndex >= newSections.length) return;
        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]]; // Swap
        setLocalContent({ ...localContent, sections: newSections });
    };
    
    return (
        <div>
            <h3 className="text-xl font-bold text-stone-700 mb-4">Gestionar Secciones</h3>
            <ul className="space-y-3">
                {localContent.sections.map((section, index) => {
                    const isHeader = section.id === 'header';
                    const isFooter = section.id === 'footer';
                    const isFixed = isHeader || isFooter;

                    return (
                        <li key={section.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => handleMoveSection(index, 'up')} disabled={isFixed || index === 1} className="disabled:opacity-20 disabled:cursor-not-allowed text-stone-500 hover:text-stone-800"><ChevronUpIcon /></button>
                                    <button onClick={() => handleMoveSection(index, 'down')} disabled={isFixed || index === localContent.sections.length - 2} className="disabled:opacity-20 disabled:cursor-not-allowed text-stone-500 hover:text-stone-800"><ChevronDownIcon /></button>
                                </div>
                                <span className="font-bold text-stone-800">{section.name}</span>
                                {isFixed && <span className="text-xs font-semibold bg-stone-200 text-stone-600 px-2 py-1 rounded-full">Fijo</span>}
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-stone-200">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-stone-600">Visible</span>
                                    <ToggleSwitch label="" checked={section.isVisible} onChange={() => handleToggleVisibility(section.id)} />
                                </div>
                                <button onClick={() => setEditingSectionId(section.id)} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 flex items-center gap-2 text-sm">
                                    <EditIcon />
                                    Editar
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

const ColorManager: React.FC<{
    localContent: typeof initialContent;
    setLocalContent: React.Dispatch<React.SetStateAction<typeof initialContent>>;
}> = ({ localContent, setLocalContent }) => {

    const handleThemeChange = (themeUpdate: Partial<typeof initialContent.theme>) => {
        setLocalContent(prev => ({
            ...prev,
            theme: { ...prev.theme, ...themeUpdate }
        }));
    };

    const handleColorChange = (key: keyof typeof initialContent.theme.colors, value: string) => {
         handleThemeChange({
            activeSchemeId: 'custom',
            colors: {
                ...localContent.theme.colors,
                [key]: value
            }
         });
    };
    
    const applyScheme = (scheme: PredefinedScheme) => {
        handleThemeChange({
            activeSchemeId: scheme.id,
            colors: { ...scheme.colors }
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Panel: Predefined Schemes */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-stone-800">Esquemas Predefinidos</h3>
                <div className="space-y-3">
                    {predefinedSchemes.map(scheme => (
                        <button
                            key={scheme.id}
                            onClick={() => applyScheme(scheme)}
                            className={`w-full text-left p-4 border rounded-lg transition-all duration-200 ${localContent.theme.activeSchemeId === scheme.id ? 'border-indigo-500 ring-2 ring-indigo-200 bg-white' : 'bg-white hover:border-stone-400'}`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{scheme.name}</span>
                                {localContent.theme.activeSchemeId === scheme.id && <span className="text-xs font-bold bg-slate-800 text-white px-2 py-1 rounded-full">Activo</span>}
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                                {Object.values(scheme.colors).map((color, index) => (
                                    <div key={index} style={{ backgroundColor: color }} className="w-6 h-6 rounded-full border border-stone-200 shadow-inner"></div>
                                ))}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Panel: Customization */}
            <div className="space-y-6">
                <div>
                     <h3 className="text-lg font-bold text-stone-800">Personalización</h3>
                     <div className="mt-4 p-6 bg-white rounded-lg border space-y-4">
                        <ColorInput label="Color Principal (Títulos, iconos)" value={localContent.theme.colors.primary} onChange={c => handleColorChange('primary', c)} />
                        <ColorInput label="Color Botones" value={localContent.theme.colors.button} onChange={c => handleColorChange('button', c)} />
                        <ColorInput label="Color Texto de Botones" value={localContent.theme.colors.buttonText} onChange={c => handleColorChange('buttonText', c)} />
                        <ColorInput label="Color Ofertas (CTA)" value={localContent.theme.colors.offer} onChange={c => handleColorChange('offer', c)} />
                        <ColorInput label="Color Texto de Ofertas" value={localContent.theme.colors.offerText} onChange={c => handleColorChange('offerText', c)} />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-stone-800">Vista Previa</h3>
                    <div className="mt-4 p-6 bg-white rounded-lg border flex flex-wrap items-center gap-4">
                        <button style={{ backgroundColor: localContent.theme.colors.primary, color: '#fff' }} className="font-bold py-2 px-4 rounded-lg shadow-md text-sm">Principal</button>
                        <button style={{ backgroundColor: localContent.theme.colors.button, color: localContent.theme.colors.buttonText }} className="font-bold py-2 px-4 rounded-lg shadow-md text-sm">Botones</button>
                        <button style={{ backgroundColor: localContent.theme.colors.offer, color: localContent.theme.colors.offerText }} className="font-bold py-2 px-4 rounded-lg shadow-md text-sm">Ofertas</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const AdminPanel: React.FC<{ content: typeof initialContent; onContentChange: (content: typeof initialContent) => void; onClose: () => void }> = ({ content, onContentChange, onClose }) => {
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [localContent, setLocalContent] = useState(content);
    const [activeTab, setActiveTab] = useState<'sections' | 'colors'>('sections');

    // Sync local state when the external content prop changes
    useEffect(() => {
        setLocalContent(content);
    }, [content]);

    const handleUpdateSectionProps = (sectionId: string, newProps: any) => {
        const newSections = localContent.sections.map(s => s.id === sectionId ? { ...s, props: newProps } : s);
        setLocalContent({ ...localContent, sections: newSections });
    };

    const handleSaveChanges = () => {
        onContentChange(localContent);
        onClose();
    };
    
    const EditorComponent = editingSectionId ? editors[localContent.sections.find(s => s.id === editingSectionId)!.component] : null;

    const TabButton: React.FC<{ tabId: 'sections' | 'colors'; children: React.ReactNode }> = ({ tabId, children }) => (
        <button
            onClick={() => { setActiveTab(tabId); setEditingSectionId(null); }}
            className={`px-4 py-2 text-sm font-semibold rounded-md flex items-center transition-colors ${activeTab === tabId ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:bg-stone-200/50'}`}
        >
            {children}
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={onClose}>
            <div className="w-full sm:max-w-3xl lg:max-w-5xl bg-stone-100 h-full shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center gap-y-2 p-3 sm:p-4 border-b bg-stone-50">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-bold text-stone-800 mr-4">Administración</h2>
                        <div className="flex items-center p-1 bg-stone-200/70 rounded-lg">
                           <TabButton tabId="sections"><ListIcon /> Secciones</TabButton>
                           <TabButton tabId="colors"><PaintBrushIcon /> Colores</TabButton>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-stone-500 hover:text-stone-800 p-2 rounded-full hover:bg-stone-200">
                        <CloseIcon />
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
                    {activeTab === 'sections' && (
                        editingSectionId && EditorComponent ? (
                            <div>
                                <button onClick={() => setEditingSectionId(null)} className="mb-6 text-indigo-600 font-semibold hover:underline">← Volver a Secciones</button>
                                <EditorComponent section={localContent.sections.find(s => s.id === editingSectionId)!} onUpdate={(newProps) => handleUpdateSectionProps(editingSectionId, newProps)} />
                            </div>
                        ) : (
                            <SectionsManager localContent={localContent} setLocalContent={setLocalContent} setEditingSectionId={setEditingSectionId} />
                        )
                    )}
                    {activeTab === 'colors' && (
                        <ColorManager localContent={localContent} setLocalContent={setLocalContent} />
                    )}
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t bg-white flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4">
                    <button onClick={onClose} className="w-full sm:w-auto bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-2 px-6 rounded-lg">
                        Cerrar
                    </button>
                     <button onClick={handleSaveChanges} className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;