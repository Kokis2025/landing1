// FIX: Import useState and useEffect from React to resolve errors where these hooks were used but not defined.
import React, { useState, useEffect } from 'react';
import { initialContent, PredefinedScheme, predefinedSchemes, Section } from '../content';
import { supabase } from '../supabaseClient';

type LangObject = { es: string; en: string };

// --- Icon Components ---
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const ChevronUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const PaintBrushIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;

// Helper for file uploads to Supabase Storage
const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    if (!file || !supabase) return;

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
        alert(`Error al subir la imagen: ${error instanceof Error ? error.message : 'Error desconocido.'}`);
    }
};

// --- Form Components ---
const TextInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
        <input type="text" value={value} onChange={onChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>
);

const MultiLangTextInput: React.FC<{ label: string; value: LangObject; onChange: (newValue: LangObject) => void; }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
        <div className="space-y-2">
            <input type="text" placeholder="Español" value={value?.es || ''} onChange={(e) => onChange({ ...value, es: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="English" value={value?.en || ''} onChange={(e) => onChange({ ...value, en: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
    </div>
);

const MultiLangTextareaInput: React.FC<{ label: string; value: LangObject; onChange: (newValue: LangObject) => void; }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
        <div className="space-y-2">
            <textarea placeholder="Español" value={value?.es || ''} onChange={(e) => onChange({ ...value, es: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <textarea placeholder="English" value={value?.en || ''} onChange={(e) => onChange({ ...value, en: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
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
            <MultiLangTextInput label="Título de la Página" value={section.props.pageTitle} onChange={val => onUpdate({ ...section.props, pageTitle: val })} />
            <ImageInput label="Logo" imageUrl={section.props.logoUrl} onImageChange={url => onUpdate({ ...section.props, logoUrl: url })} />
            <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Alineación</label>
                <div className="flex gap-1 p-1 border border-stone-200 rounded-lg bg-stone-200/70 w-min">
                    <label className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md has-[:checked]:bg-white has-[:checked]:shadow-sm">
                        <input
                            type="radio"
                            name="alignment"
                            value="left"
                            checked={section.props.alignment === 'left' || !section.props.alignment}
                            onChange={() => onUpdate({ ...section.props, alignment: 'left' })}
                            className="sr-only"
                        />
                        <span className="text-sm font-semibold">Izquierda</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md has-[:checked]:bg-white has-[:checked]:shadow-sm">
                        <input
                            type="radio"
                            name="alignment"
                            value="center"
                            checked={section.props.alignment === 'center'}
                            onChange={() => onUpdate({ ...section.props, alignment: 'center' })}
                            className="sr-only"
                        />
                        <span className="text-sm font-semibold">Centro</span>
                    </label>
                </div>
            </div>
        </SectionEditor>
    ),
    Hero: ({ section, onUpdate }) => (
        <SectionEditor section={section}>
            <MultiLangTextInput label="Título" value={section.props.title} onChange={val => onUpdate({ ...section.props, title: val })} />
            <MultiLangTextareaInput label="Subtítulo" value={section.props.subtitle} onChange={val => onUpdate({ ...section.props, subtitle: val })} />
            <MultiLangTextInput label="Texto del Botón" value={section.props.ctaButtonText} onChange={val => onUpdate({ ...section.props, ctaButtonText: val })} />
            <TextInput label="Enlace del Botón" value={section.props.ctaButtonLink} onChange={e => onUpdate({ ...section.props, ctaButtonLink: e.target.value })} />
            <ToggleSwitch label="Mostrar Botón de Acción" checked={section.props.isCtaButtonVisible} onChange={val => onUpdate({ ...section.props, isCtaButtonVisible: val })} />
            <ImageInput label="Imagen Izquierda (Fondo)" imageUrl={section.props.leftImageUrl} onImageChange={url => onUpdate({ ...section.props, leftImageUrl: url })} />
            <ImageInput label="Imagen Derecha (Principal)" imageUrl={section.props.rightImageUrl} onImageChange={url => onUpdate({ ...section.props, rightImageUrl: url })} />
        </SectionEditor>
    ),
    // ... other editors would follow a similar pattern ...
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
        
        if (newSections[index].id === 'header' || newSections[index].id === 'footer' ||
            newSections[targetIndex].id === 'header' || newSections[targetIndex].id === 'footer') {
            return;
        }

        if (targetIndex < 1 || targetIndex >= newSections.length - 1) return;
        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]]; // Swap
        setLocalContent({ ...localContent, sections: newSections });
    };
    
    return (
        <div>
            <h3 className="text-xl font-bold text-stone-700 mb-4">Gestionar Secciones</h3>
            <ul className="space-y-3">
                {localContent.sections.map((section, index) => {
                    const isFixed = section.id === 'header' || section.id === 'footer';
                    return (
                        <li key={section.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => handleMoveSection(index, 'up')} disabled={isFixed || index <= 1} className="disabled:opacity-20 disabled:cursor-not-allowed text-stone-500 hover:text-stone-800"><ChevronUpIcon /></button>
                                    <button onClick={() => handleMoveSection(index, 'down')} disabled={isFixed || index >= localContent.sections.length - 2} className="disabled:opacity-20 disabled:cursor-not-allowed text-stone-500 hover:text-stone-800"><ChevronDownIcon /></button>
                                </div>
                                <span className="font-bold text-stone-800">{section.name}</span>
                                {isFixed && <span className="text-xs font-semibold bg-stone-200 text-stone-600 px-2 py-1 rounded-full">Fijo</span>}
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-stone-200">
                                <ToggleSwitch label="Visible" checked={section.isVisible} onChange={() => handleToggleVisibility(section.id)} />
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
            </div>
        </div>
    );
};


const AdminPanel: React.FC<{ content: typeof initialContent; onContentChange: (content: typeof initialContent) => void; onClose: () => void }> = ({ content, onContentChange, onClose }) => {
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [localContent, setLocalContent] = useState(content);
    const [activeTab, setActiveTab] = useState<'sections' | 'colors'>('sections');

    useEffect(() => { setLocalContent(content); }, [content]);

    const handleUpdateSectionProps = (sectionId: string, newProps: any) => {
        const newSections = localContent.sections.map(s => s.id === sectionId ? { ...s, props: newProps } : s);
        setLocalContent({ ...localContent, sections: newSections });
    };

    const handleSaveChanges = () => { onContentChange(localContent); onClose(); };
    
    const handleLogout = async () => {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        } else {
            window.location.reload(); 
        }
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
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end" onClick={onClose}>
            <div className="w-full sm:max-w-3xl lg:max-w-5xl bg-stone-100 h-full shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
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
                
                <div className="p-4 border-t bg-white flex flex-col-reverse sm:flex-row justify-between items-center gap-3 sm:gap-4">
                     <button onClick={handleLogout} className="w-full sm:w-auto bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-6 rounded-lg transition-colors">Cerrar Sesión</button>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                        <button onClick={onClose} className="w-full sm:w-auto bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-2 px-6 rounded-lg">
                            Cancelar
                        </button>
                         <button onClick={handleSaveChanges} className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md">
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;