// FIX: Import useState and useEffect from React to resolve errors where these hooks were used but not defined.
import React, { useState, useEffect } from 'react';
import { initialContent, PredefinedScheme, predefinedSchemes, Section } from '../content';
import { supabase } from '../supabaseClient';

// --- Translation Setup ---
const translations = {
    es: {
        adminTitle: 'Administración',
        sectionsTab: 'Secciones',
        colorsTab: 'Colores',
        close: 'Cerrar',
        saveChanges: 'Guardar Cambios',
        backToSections: '← Volver a Secciones',
        manageSections: 'Gestionar Secciones',
        fixed: 'Fijo',
        visible: 'Visible',
        edit: 'Editar',
        predefinedSchemes: 'Esquemas Predefinidos',
        active: 'Activo',
        customization: 'Personalización',
        primaryColor: 'Color Principal (Títulos, iconos)',
        buttonColor: 'Color Botones',
        buttonTextColor: 'Color Texto de Botones',
        offerColor: 'Color Ofertas (CTA)',
        offerTextColor: 'Color Texto de Ofertas',
        preview: 'Vista Previa',
        previewPrimary: 'Principal',
        previewButtons: 'Botones',
        previewOffers: 'Ofertas',
        pageTitle: 'Título de la Página',
        logo: 'Logo',
        uploading: 'Subiendo...',
        uploadInstructions: 'Sube una imagen para reemplazar la actual.',
        showCtaButton: 'Mostrar Botón de Acción',
        title: 'Título',
        subtitle: 'Subtítulo',
        buttonText: 'Texto del Botón',
        buttonLink: 'Enlace del Botón',
        leftImage: 'Imagen Izquierda (Fondo)',
        rightImage: 'Imagen Derecha (Principal)',
        sectionIcon: 'Icono de Sección (3D)',
        paragraph1: 'Párrafo 1',
        paragraph2: 'Párrafo 2',
        signatureImage: 'Imagen de la Firma',
        authorImage: 'Imagen del Autor (con Capi y Hely)',
        imageCaption: 'Pie de foto (nombre de personajes)',
        mainSectionTitle: 'Título Principal de la Sección',
        bookCategories: 'Categorías de Libros',
        categoryTitle: 'Título de Categoría',
        removeCategory: 'Eliminar Categoría',
        bookTitle: 'Título del Libro',
        storeURL: 'URL de la Tienda',
        storeName: 'Nombre de la Tienda',
        rating: 'Calificación (0-5)',
        backsideDescription: 'Descripción de la Contraportada',
        bookCover: 'Portada del Libro',
        removeBook: 'Eliminar Libro',
        addBookTo: 'Añadir Libro a "{title}"',
        addBookCategory: 'Añadir Categoría de Libros',
        description: 'Descripción',
        youtubeVideoId: 'ID del Video de YouTube',
        benefitItems: 'Ítems de Beneficios',
        benefitTitle: 'Título del Beneficio',
        icon: 'Icono',
        iconHeart: 'Corazón (Lectura Consciente)',
        iconLeaf: 'Hoja (Relajación)',
        iconUsers: 'Usuarios (Conexión Familiar)',
        iconBadge: 'Insignia (Recomendado)',
        removeBenefit: 'Eliminar Beneficio',
        addBenefit: 'Añadir Beneficio',
        tag: 'Tag',
        gradientStart: 'Inicio del Degradado',
        gradientEnd: 'Fin del Degradado',
        cardIcon: 'Icono de Tarjeta (esquina)',
        carouselImages: 'Imágenes del Carrusel',
        image: 'Imagen {index}',
        removeImage: 'Eliminar Imagen',
        addImage: 'Añadir Imagen',
        testimonials: 'Testimonios',
        testimonialQuote: 'Cita del Testimonio',
        author: 'Autor',
        location: 'Ubicación (ej: Ciudad, País)',
        avatar: 'Foto de Perfil (Avatar)',
        removeTestimonial: 'Eliminar Testimonio',
        addTestimonial: 'Añadir Testimonio',
        quote: 'Cita',
        faqItems: 'Preguntas y Respuestas',
        question: 'Pregunta',
        answer: 'Respuesta',
        removeQuestion: 'Eliminar Pregunta',
        addQuestion: 'Añadir Pregunta',
        primaryButtonText: 'Texto Botón Principal',
        secondaryButtonText: 'Texto Botón Secundario',
        quickLinks: 'Enlaces Rápidos',
        titleOf: 'Título de "{title}"',
        linkText: 'Texto del Enlace',
        linkURL: 'URL del Enlace',
        removeLink: 'Eliminar Enlace',
        addLink: 'Añadir Enlace',
        stores: 'Tiendas',
        contactSocial: 'Contacto y Redes Sociales',
        sectionTitle: 'Título de la sección',
        contactEmail: 'Email de Contacto',
        socialMedia: 'Redes Sociales',
        platform: 'Plataforma',
        profileURL: 'URL del Perfil',
        removeSocial: 'Eliminar Red Social',
        addSocial: 'Añadir Red Social',
        copyrightText: 'Texto de Copyright',
    },
    en: {
        adminTitle: 'Administration',
        sectionsTab: 'Sections',
        colorsTab: 'Colors',
        close: 'Close',
        saveChanges: 'Save Changes',
        backToSections: '← Back to Sections',
        manageSections: 'Manage Sections',
        fixed: 'Fixed',
        visible: 'Visible',
        edit: 'Edit',
        predefinedSchemes: 'Predefined Schemes',
        active: 'Active',
        customization: 'Customization',
        primaryColor: 'Primary Color (Titles, icons)',
        buttonColor: 'Button Color',
        buttonTextColor: 'Button Text Color',
        offerColor: 'Offer Color (CTA)',
        offerTextColor: 'Offer Text Color',
        preview: 'Preview',
        previewPrimary: 'Primary',
        previewButtons: 'Buttons',
        previewOffers: 'Offers',
        pageTitle: 'Page Title',
        logo: 'Logo',
        uploading: 'Uploading...',
        uploadInstructions: 'Upload an image to replace the current one.',
        showCtaButton: 'Show Call-to-Action Button',
        title: 'Title',
        subtitle: 'Subtitle',
        buttonText: 'Button Text',
        buttonLink: 'Button Link',
        leftImage: 'Left Image (Background)',
        rightImage: 'Right Image (Main)',
        sectionIcon: 'Section Icon (3D)',
        paragraph1: 'Paragraph 1',
        paragraph2: 'Paragraph 2',
        signatureImage: 'Signature Image',
        authorImage: 'Author Image (with Capi & Hely)',
        imageCaption: 'Image Caption (character name)',
        mainSectionTitle: 'Main Section Title',
        bookCategories: 'Book Categories',
        categoryTitle: 'Category Title',
        removeCategory: 'Remove Category',
        bookTitle: 'Book Title',
        storeURL: 'Store URL',
        storeName: 'Store Name',
        rating: 'Rating (0-5)',
        backsideDescription: 'Backside Description',
        bookCover: 'Book Cover',
        removeBook: 'Remove Book',
        addBookTo: 'Add Book to "{title}"',
        addBookCategory: 'Add Book Category',
        description: 'Description',
        youtubeVideoId: 'YouTube Video ID',
        benefitItems: 'Benefit Items',
        benefitTitle: 'Benefit Title',
        icon: 'Icon',
        iconHeart: 'Heart (Mindful Reading)',
        iconLeaf: 'Leaf (Relaxation)',
        iconUsers: 'Users (Family Connection)',
        iconBadge: 'Badge (Recommended)',
        removeBenefit: 'Remove Benefit',
        addBenefit: 'Add Benefit',
        tag: 'Tag',
        gradientStart: 'Gradient Start',
        gradientEnd: 'Gradient End',
        cardIcon: 'Card Icon (corner)',
        carouselImages: 'Carousel Images',
        image: 'Image {index}',
        removeImage: 'Remove Image',
        addImage: 'Add Image',
        testimonials: 'Testimonials',
        testimonialQuote: 'Testimonial Quote',
        author: 'Author',
        location: 'Location (e.g., City, Country)',
        avatar: 'Profile Picture (Avatar)',
        removeTestimonial: 'Remove Testimonial',
        addTestimonial: 'Add Testimonial',
        quote: 'Quote',
        faqItems: 'Questions & Answers',
        question: 'Question',
        answer: 'Answer',
        removeQuestion: 'Remove Question',
        addQuestion: 'Add Question',
        primaryButtonText: 'Primary Button Text',
        secondaryButtonText: 'Secondary Button Text',
        quickLinks: 'Quick Links',
        titleOf: 'Title of "{title}"',
        linkText: 'Link Text',
        linkURL: 'Link URL',
        removeLink: 'Remove Link',
        addLink: 'Add Link',
        stores: 'Stores',
        contactSocial: 'Contact & Social Media',
        sectionTitle: 'Section title',
        contactEmail: 'Contact Email',
        socialMedia: 'Social Media',
        platform: 'Platform',
        profileURL: 'Profile URL',
        removeSocial: 'Remove Social Media',
        addSocial: 'Add Social Media',
        copyrightText: 'Copyright Text',
    },
};
type Language = keyof typeof translations;
type TranslationKey = keyof typeof translations.es;

const LanguageContext = React.createContext<{
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
    t: (key: TranslationKey, vars?: Record<string, string>) => string;
} | null>(null);

const useTranslations = () => {
    const context = React.useContext(LanguageContext);
    if (!context) throw new Error('useTranslations must be used within a LanguageProvider');
    return context;
};

// --- Icon Components ---
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const ChevronUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const PaintBrushIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;

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
    const { t } = useTranslations();
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
                            <span>{t('uploading')}</span>
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
                    <p className="text-xs text-stone-400 mt-1">{t('uploadInstructions')}</p>
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
    Header: ({ section, onUpdate }) => {
        const { t } = useTranslations();
        return (<SectionEditor section={section}>
            <TextInput label={t('pageTitle')} value={section.props.pageTitle} onChange={e => onUpdate({ ...section.props, pageTitle: e.target.value })} />
            <ImageInput label={t('logo')} imageUrl={section.props.logoUrl} onImageChange={url => onUpdate({ ...section.props, logoUrl: url })} />
        </SectionEditor>
    )},
    Hero: ({ section, onUpdate }) => {
        const { t } = useTranslations();
        return (<SectionEditor section={section}>
            <TextInput label={t('title')} value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
            <TextareaInput label={t('subtitle')} value={section.props.subtitle} onChange={e => onUpdate({ ...section.props, subtitle: e.target.value })} />
            <TextInput label={t('buttonText')} value={section.props.ctaButtonText} onChange={e => onUpdate({ ...section.props, ctaButtonText: e.target.value })} />
            <TextInput label={t('buttonLink')} value={section.props.ctaButtonLink} onChange={e => onUpdate({ ...section.props, ctaButtonLink: e.target.value })} />
            <ToggleSwitch label={t('showCtaButton')} checked={section.props.isCtaButtonVisible} onChange={val => onUpdate({ ...section.props, isCtaButtonVisible: val })} />
            <ImageInput label={t('leftImage')} imageUrl={section.props.leftImageUrl} onImageChange={url => onUpdate({ ...section.props, leftImageUrl: url })} />
            <ImageInput label={t('rightImage')} imageUrl={section.props.rightImageUrl} onImageChange={url => onUpdate({ ...section.props, rightImageUrl: url })} />
        </SectionEditor>
    )},
    About: ({ section, onUpdate }) => {
        const { t } = useTranslations();
        return (<SectionEditor section={section}>
            <ImageInput label={t('sectionIcon')} imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
            <TextInput label={t('title')} value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
            <TextareaInput label={t('paragraph1')} value={section.props.paragraph1} onChange={e => onUpdate({ ...section.props, paragraph1: e.target.value })} />
            <TextareaInput label={t('paragraph2')} value={section.props.paragraph2} onChange={e => onUpdate({ ...section.props, paragraph2: e.target.value })} />
            <ImageInput label={t('signatureImage')} imageUrl={section.props.signatureImgUrl} onImageChange={url => onUpdate({ ...section.props, signatureImgUrl: url })} />
            <ImageInput label={t('authorImage')} imageUrl={section.props.aboutImageUrl} onImageChange={url => onUpdate({ ...section.props, aboutImageUrl: url })} />
            <TextInput label={t('imageCaption')} value={section.props.characterName} onChange={e => onUpdate({ ...section.props, characterName: e.target.value })} />
        </SectionEditor>
    )},
    Books: ({ section, onUpdate }) => {
        const { t } = useTranslations();
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
                <ImageInput label={t('sectionIcon')} imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
                <TextInput label={t('mainSectionTitle')} value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
                
                <h4 className="text-md font-bold text-stone-700 pt-4 mt-6 border-t">{t('bookCategories')}</h4>
                <div className="space-y-6">
                    {section.props.bookSections?.map((bookSection: any, sectionIndex: number) => (
                        <div key={bookSection.id} className="p-4 border-2 border-stone-200 rounded-lg bg-white space-y-4">
                            <div className="flex justify-between items-center gap-4 pb-4 border-b">
                                <TextInput label={t('categoryTitle')} value={bookSection.title} onChange={e => handleSectionTitleChange(sectionIndex, e.target.value)} />
                                <button onClick={() => removeBookSection(sectionIndex)} className="mt-6 text-red-600 hover:text-red-800 text-sm font-semibold whitespace-nowrap">{t('removeCategory')}</button>
                            </div>
                            
                            {bookSection.books.map((book: any, bookIndex: number) => (
                                <div key={book.id} className="p-4 border rounded-lg bg-stone-50 space-y-4">
                                    <TextInput label={t('bookTitle')} value={book.title} onChange={e => handleBookChange(sectionIndex, bookIndex, 'title', e.target.value)} />
                                    <TextInput label={t('storeURL')} value={book.link} onChange={e => handleBookChange(sectionIndex, bookIndex, 'link', e.target.value)} />
                                    <TextInput label={t('storeName')} value={book.store} onChange={e => handleBookChange(sectionIndex, bookIndex, 'store', e.target.value)} />
                                    <NumberInput label={t('rating')} value={book.rating} onChange={e => handleBookChange(sectionIndex, bookIndex, 'rating', parseInt(e.target.value, 10))} min={0} max={5} />
                                    <TextareaInput label={t('backsideDescription')} value={book.backsideDescription} onChange={e => handleBookChange(sectionIndex, bookIndex, 'backsideDescription', e.target.value)} />
                                    <ImageInput label={t('bookCover')} imageUrl={book.imageUrl} onImageChange={url => handleBookImageChange(sectionIndex, bookIndex, url)} />
                                    <button onClick={() => removeBook(sectionIndex, bookIndex)} className="mt-2 text-red-600 hover:text-red-800 text-sm font-semibold">{t('removeBook')}</button>
                                </div>
                            ))}
                             <button onClick={() => addBook(sectionIndex)} className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm text-sm">{t('addBookTo', {title: bookSection.title})}</button>
                        </div>
                    ))}
                </div>
                <button onClick={addBookSection} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">{t('addBookCategory')}</button>
            </SectionEditor>
        );
    },
     Video: ({ section, onUpdate }) => {
        const { t } = useTranslations();
        return (<SectionEditor section={section}>
             <ImageInput label={t('sectionIcon')} imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
             <TextInput label={t('title')} value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
             <TextareaInput label={t('description')} value={section.props.description} onChange={e => onUpdate({ ...section.props, description: e.target.value })} />
             <TextInput label={t('youtubeVideoId')} value={section.props.videoId} onChange={e => onUpdate({ ...section.props, videoId: e.target.value })} />
        </SectionEditor>
    )},
    Benefits: ({ section, onUpdate }) => {
        const { t } = useTranslations();
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
                <ImageInput label={t('sectionIcon')} imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
                <TextInput label={t('title')} value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
                
                <h4 className="text-md font-bold text-stone-700 pt-4 mt-6 border-t">{t('benefitItems')}</h4>
                <div className="space-y-6">
                    {section.props.items.map((item: any, index: number) => (
                        <div key={item.id} className="p-4 border rounded-lg bg-white space-y-4">
                            <TextInput label={t('benefitTitle')} value={item.title} onChange={e => handleItemChange(index, 'title', e.target.value)} />
                            <TextareaInput label={t('description')} value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} />
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">{t('icon')}</label>
                                <select 
                                    value={item.icon} 
                                    onChange={e => handleItemChange(index, 'icon', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                >
                                    <option value="Heart">{t('iconHeart')}</option>
                                    <option value="Leaf">{t('iconLeaf')}</option>
                                    <option value="Users">{t('iconUsers')}</option>
                                    <option value="Badge">{t('iconBadge')}</option>
                                </select>
                            </div>
                            <button onClick={() => removeItem(index)} className="mt-2 text-red-600 hover:text-red-800 text-sm font-semibold">{t('removeBenefit')}</button>
                        </div>
                    ))}
                </div>
                <button onClick={addItem} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">{t('addBenefit')}</button>
            </SectionEditor>
        );
    },
    Bonus: ({ section, onUpdate }) => {
        const { t } = useTranslations();
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
                <ImageInput label={t('sectionIcon')} imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
                <TextInput label={t('tag')} value={section.props.tag} onChange={e => onUpdate({ ...section.props, tag: e.target.value })} />
                <TextInput label={t('title')} value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
                <TextareaInput label={t('description')} value={section.props.description} onChange={e => onUpdate({ ...section.props, description: e.target.value })} />
                <ColorInput label={t('gradientStart')} value={section.props.cardGradientStart} onChange={c => onUpdate({ ...section.props, cardGradientStart: c })} />
                <ColorInput label={t('gradientEnd')} value={section.props.cardGradientEnd} onChange={c => onUpdate({ ...section.props, cardGradientEnd: c })} />
                <ImageInput label={t('cardIcon')} imageUrl={section.props.cardIconUrl} onImageChange={url => onUpdate({ ...section.props, cardIconUrl: url })} />

                <h4 className="text-md font-bold text-stone-700 pt-4 mt-6 border-t">{t('carouselImages')}</h4>
                <div className="space-y-4">
                    {section.props.imageUrls.map((imageUrl: string, index: number) => (
                        <div key={index} className="p-4 border rounded-lg bg-white space-y-4">
                            <ImageInput label={t('image', { index: (index + 1).toString() })} imageUrl={imageUrl} onImageChange={url => handleImageChange(index, url)} />
                            <button onClick={() => removeImage(index)} className="text-red-600 hover:text-red-800 text-sm font-semibold">{t('removeImage')}</button>
                        </div>
                    ))}
                </div>
                <button onClick={addImage} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">{t('addImage')}</button>
            </SectionEditor>
        );
    },
    Testimonials: ({ section, onUpdate }) => {
        const { t } = useTranslations();
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
                <ImageInput label={t('sectionIcon')} imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
                <TextInput label={t('mainSectionTitle')} value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
                <h4 className="text-md font-bold text-stone-700 pt-4 mt-6 border-t">{t('testimonials')}</h4>
                <div className="space-y-6">
                    {section.props.items.map((item: any, index: number) => (
                        <div key={item.id} className="p-4 border rounded-lg bg-white space-y-4">
                             <TextareaInput label={t('testimonialQuote')} value={item.quote} onChange={e => handleItemChange(index, 'quote', e.target.value)} />
                             <TextInput label={t('author')} value={item.author} onChange={e => handleItemChange(index, 'author', e.target.value)} />
                             <TextInput label={t('location')} value={item.location} onChange={e => handleItemChange(index, 'location', e.target.value)} />
                             <ImageInput label={t('avatar')} imageUrl={item.avatarUrl} onImageChange={url => handleItemImageChange(index, url)} />
                             <button onClick={() => removeItem(index)} className="mt-2 text-red-600 hover:text-red-800 text-sm font-semibold">{t('removeTestimonial')}</button>
                        </div>
                    ))}
                </div>
                <button onClick={addItem} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">{t('addTestimonial')}</button>
            </SectionEditor>
        );
    },
    Guarantee: ({ section, onUpdate }) => {
        const { t } = useTranslations();
        return (<SectionEditor section={section}>
             <ImageInput label={t('sectionIcon')} imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
             <TextInput label={t('title')} value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
             <TextInput label={t('quote')} value={section.props.quote} onChange={e => onUpdate({ ...section.props, quote: e.target.value })} />
             <TextareaInput label={t('description')} value={section.props.description} onChange={e => onUpdate({ ...section.props, description: e.target.value })} />
        </SectionEditor>
    )},
    Faq: ({ section, onUpdate }) => {
        const { t } = useTranslations();
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
                 <ImageInput label={t('sectionIcon')} imageUrl={props.iconUrl} onImageChange={url => onUpdate({ ...props, iconUrl: url })} />
                 <TextInput label={t('mainSectionTitle')} value={props.title} onChange={e => onUpdate({ ...props, title: e.target.value })} />
                 <h4 className="text-md font-bold text-stone-700 pt-4 mt-6 border-t">{t('faqItems')}</h4>
                 <div className="space-y-6">
                     {props.items.map((item: any, index: number) => (
                         <div key={item.id} className="p-4 border rounded-lg bg-white space-y-4">
                              <TextInput label={t('question')} value={item.question} onChange={e => handleItemChange(index, 'question', e.target.value)} />
                              <TextareaInput label={t('answer')} value={item.answer} onChange={e => handleItemChange(index, 'answer', e.target.value)} />
                              <button onClick={() => removeItem(index)} className="mt-2 text-red-600 hover:text-red-800 text-sm font-semibold">{t('removeQuestion')}</button>
                         </div>
                     ))}
                 </div>
                 <button onClick={addItem} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">{t('addQuestion')}</button>
            </SectionEditor>
        );
    },
    Cta: ({ section, onUpdate }) => {
        const { t } = useTranslations();
        return (<SectionEditor section={section}>
             <ImageInput label={t('sectionIcon')} imageUrl={section.props.iconUrl} onImageChange={url => onUpdate({ ...section.props, iconUrl: url })} />
             <TextInput label={t('title')} value={section.props.title} onChange={e => onUpdate({ ...section.props, title: e.target.value })} />
             <TextareaInput label={t('description')} value={section.props.description} onChange={e => onUpdate({ ...section.props, description: e.target.value })} />
             <TextInput label={t('primaryButtonText')} value={section.props.primaryButtonText} onChange={e => onUpdate({ ...section.props, primaryButtonText: e.target.value })} />
             <TextInput label={t('secondaryButtonText')} value={section.props.secondaryButtonText} onChange={e => onUpdate({ ...section.props, secondaryButtonText: e.target.value })} />
        </SectionEditor>
    )},
    Footer: ({ section, onUpdate }) => {
        const { t } = useTranslations();
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
                    label={t('titleOf', { title: props[listName].title })}
                    value={props[listName].title} 
                    onChange={e => handleNestedPropChange(listName, 'title', e.target.value)} 
                />
                <div className="space-y-4">
                    {props[listName].links.map((link: any, index: number) => (
                        <div key={link.id} className="p-4 border rounded-lg bg-stone-50 space-y-3">
                            <TextInput label={t('linkText')} value={link.text} onChange={e => handleLinkListChange(listName, index, 'text', e.target.value)} />
                            <TextInput label={t('linkURL')} value={link.url} onChange={e => handleLinkListChange(listName, index, 'url', e.target.value)} />
                            <button onClick={() => removeLink(listName, index)} className="text-red-600 hover:text-red-800 text-sm font-semibold">{t('removeLink')}</button>
                        </div>
                    ))}
                </div>
                <button onClick={() => addLink(listName)} className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm text-sm">{t('addLink')}</button>
            </div>
        );
        
        return (
            <SectionEditor section={section}>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-md font-bold text-stone-700 mb-2">{t('quickLinks')}</h4>
                        <LinkEditor listName="quickLinks" />
                    </div>
                    <div className="pt-6 border-t">
                        <h4 className="text-md font-bold text-stone-700 mb-2">{t('stores')}</h4>
                        <LinkEditor listName="stores" />
                    </div>
                    <div className="pt-6 border-t">
                        <h4 className="text-md font-bold text-stone-700 mb-2">{t('contactSocial')}</h4>
                        <div className="space-y-4 p-4 border rounded-lg bg-white">
                            <TextInput label={t('sectionTitle')} value={props.contact.title} onChange={e => handleNestedPropChange('contact', 'title', e.target.value)} />
                            <TextInput label={t('contactEmail')} value={props.contact.email} onChange={e => handleNestedPropChange('contact', 'email', e.target.value)} />
                            <h5 className="text-sm font-bold text-stone-600 pt-2">{t('socialMedia')}</h5>
                            <div className="space-y-4">
                                {props.contact.social.map((social: any, index: number) => (
                                    <div key={social.id} className="p-4 border rounded-lg bg-stone-50 space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-1">{t('platform')}</label>
                                            <select value={social.platform} onChange={e => handleSocialChange(index, 'platform', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                                <option value="Instagram">Instagram</option>
                                                <option value="Facebook">Facebook</option>
                                            </select>
                                        </div>
                                        <TextInput label={t('profileURL')} value={social.url} onChange={e => handleSocialChange(index, 'url', e.target.value)} />
                                        <button onClick={() => removeSocial(index)} className="text-red-600 hover:text-red-800 text-sm font-semibold">{t('removeSocial')}</button>
                                    </div>
                                ))}
                            </div>
                             <button onClick={addSocial} className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm text-sm">{t('addSocial')}</button>
                        </div>
                    </div>
                    <div className="pt-6 border-t">
                         <TextareaInput label={t('copyrightText')} value={props.copyrightText} onChange={e => handlePropChange('copyrightText', e.target.value)} />
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
    const { t } = useTranslations();
    const handleToggleVisibility = (sectionId: string) => {
        const newSections = localContent.sections.map(s => s.id === sectionId ? { ...s, isVisible: !s.isVisible } : s);
        setLocalContent({ ...localContent, sections: newSections });
    };

    const handleMoveSection = (index: number, direction: 'up' | 'down') => {
        const newSections = [...localContent.sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        
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
            <h3 className="text-xl font-bold text-stone-700 mb-4">{t('manageSections')}</h3>
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
                                {isFixed && <span className="text-xs font-semibold bg-stone-200 text-stone-600 px-2 py-1 rounded-full">{t('fixed')}</span>}
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-stone-200">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-stone-600">{t('visible')}</span>
                                    <ToggleSwitch label="" checked={section.isVisible} onChange={() => handleToggleVisibility(section.id)} />
                                </div>
                                <button onClick={() => setEditingSectionId(section.id)} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 flex items-center gap-2 text-sm">
                                    <EditIcon />
                                    {t('edit')}
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
    const { t } = useTranslations();
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
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-stone-800">{t('predefinedSchemes')}</h3>
                <div className="space-y-3">
                    {predefinedSchemes.map(scheme => (
                        <button
                            key={scheme.id}
                            onClick={() => applyScheme(scheme)}
                            className={`w-full text-left p-4 border rounded-lg transition-all duration-200 ${localContent.theme.activeSchemeId === scheme.id ? 'border-indigo-500 ring-2 ring-indigo-200 bg-white' : 'bg-white hover:border-stone-400'}`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{scheme.name}</span>
                                {localContent.theme.activeSchemeId === scheme.id && <span className="text-xs font-bold bg-slate-800 text-white px-2 py-1 rounded-full">{t('active')}</span>}
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

            <div className="space-y-6">
                <div>
                     <h3 className="text-lg font-bold text-stone-800">{t('customization')}</h3>
                     <div className="mt-4 p-6 bg-white rounded-lg border space-y-4">
                        <ColorInput label={t('primaryColor')} value={localContent.theme.colors.primary} onChange={c => handleColorChange('primary', c)} />
                        <ColorInput label={t('buttonColor')} value={localContent.theme.colors.button} onChange={c => handleColorChange('button', c)} />
                        <ColorInput label={t('buttonTextColor')} value={localContent.theme.colors.buttonText} onChange={c => handleColorChange('buttonText', c)} />
                        <ColorInput label={t('offerColor')} value={localContent.theme.colors.offer} onChange={c => handleColorChange('offer', c)} />
                        <ColorInput label={t('offerTextColor')} value={localContent.theme.colors.offerText} onChange={c => handleColorChange('offerText', c)} />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-stone-800">{t('preview')}</h3>
                    <div className="mt-4 p-6 bg-white rounded-lg border flex flex-wrap items-center gap-4">
                        <button style={{ backgroundColor: localContent.theme.colors.primary, color: '#fff' }} className="font-bold py-2 px-4 rounded-lg shadow-md text-sm">{t('previewPrimary')}</button>
                        <button style={{ backgroundColor: localContent.theme.colors.button, color: localContent.theme.colors.buttonText }} className="font-bold py-2 px-4 rounded-lg shadow-md text-sm">{t('previewButtons')}</button>
                        <button style={{ backgroundColor: localContent.theme.colors.offer, color: localContent.theme.colors.offerText }} className="font-bold py-2 px-4 rounded-lg shadow-md text-sm">{t('previewOffers')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useTranslations();
    return (
        <div className="flex items-center p-1 bg-stone-200/70 rounded-lg">
            <button onClick={() => setLanguage('es')} className={`px-3 py-1 text-sm font-semibold rounded-md ${language === 'es' ? 'bg-white shadow-sm' : 'text-stone-600 hover:bg-stone-200/50'}`}>ES</button>
            <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm font-semibold rounded-md ${language === 'en' ? 'bg-white shadow-sm' : 'text-stone-600 hover:bg-stone-200/50'}`}>EN</button>
        </div>
    );
};

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('es');
    const t = (key: TranslationKey, vars: Record<string, string> = {}) => {
        let str = translations[language][key] || translations.es[key];
        Object.keys(vars).forEach(varKey => {
            str = str.replace(`{${varKey}}`, vars[varKey]);
        });
        return str;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

const AdminPanelContent: React.FC<{ content: typeof initialContent; onContentChange: (content: typeof initialContent) => void; onClose: () => void }> = ({ content, onContentChange, onClose }) => {
    const { t } = useTranslations();
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [localContent, setLocalContent] = useState(content);
    const [activeTab, setActiveTab] = useState<'sections' | 'colors'>('sections');

    useEffect(() => { setLocalContent(content); }, [content]);

    const handleUpdateSectionProps = (sectionId: string, newProps: any) => {
        const newSections = localContent.sections.map(s => s.id === sectionId ? { ...s, props: newProps } : s);
        setLocalContent({ ...localContent, sections: newSections });
    };

    const handleSaveChanges = () => { onContentChange(localContent); onClose(); };
    
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
                <div className="flex flex-wrap justify-between items-center gap-y-2 p-3 sm:p-4 border-b bg-stone-50">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-bold text-stone-800 mr-4">{t('adminTitle')}</h2>
                        <div className="flex items-center p-1 bg-stone-200/70 rounded-lg">
                           <TabButton tabId="sections"><ListIcon /> {t('sectionsTab')}</TabButton>
                           <TabButton tabId="colors"><PaintBrushIcon /> {t('colorsTab')}</TabButton>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <button onClick={onClose} className="text-stone-500 hover:text-stone-800 p-2 rounded-full hover:bg-stone-200">
                            <CloseIcon />
                        </button>
                    </div>
                </div>
                
                <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
                    {activeTab === 'sections' && (
                        editingSectionId && EditorComponent ? (
                            <div>
                                <button onClick={() => setEditingSectionId(null)} className="mb-6 text-indigo-600 font-semibold hover:underline">{t('backToSections')}</button>
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
                
                <div className="p-4 border-t bg-white flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4">
                    <button onClick={onClose} className="w-full sm:w-auto bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-2 px-6 rounded-lg">
                        {t('close')}
                    </button>
                     <button onClick={handleSaveChanges} className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md">
                        {t('saveChanges')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminPanel: React.FC<{ content: typeof initialContent; onContentChange: (content: typeof initialContent) => void; onClose: () => void }> = (props) => (
    <LanguageProvider>
        <AdminPanelContent {...props} />
    </LanguageProvider>
);

export default AdminPanel;