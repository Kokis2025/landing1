import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Books from './components/Books';
import Video from './components/Video';
import Benefits from './components/Benefits';
import Bonus from './components/Bonus';
import Testimonials from './components/Testimonials';
import Guarantee from './components/Guarantee';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import { initialContent, Section } from './content';
import { supabase, supabaseInitializationError } from './supabaseClient';

const componentMap: { [key: string]: React.FC<any> } = {
    Header, Hero, About, Books, Video, Benefits, Bonus, Testimonials, Guarantee, Faq, Cta, Footer,
};

const CONTENT_ID = 'capi-hely-landing';
type Language = 'es' | 'en';

// Helper to get props in the currently selected language
const getLocalizedProps = (props: any, lang: Language): any => {
    if (!props) return {};
    const localized: { [key: string]: any } = {};
    for (const key in props) {
        const value = props[key];
        if (typeof value === 'object' && value !== null && 'es' in value && 'en' in value) {
            localized[key] = value[lang] || value['es']; // Fallback to Spanish
        } else if (Array.isArray(value)) {
             localized[key] = value.map(item => getLocalizedProps(item, lang));
        } else {
            localized[key] = value;
        }
    }
    return localized;
};

const App: React.FC = () => {
    if (window.location.pathname === '/login') {
        return <Login />;
    }
    return <LandingPage />;
};

const LandingPage: React.FC = () => {
    const [content, setContent] = useState(initialContent);
    const [session, setSession] = useState<Session | null>(null);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [language, setLanguage] = useState<Language>(() => {
        const savedLang = localStorage.getItem('capi-hely-lang');
        return (savedLang === 'es' || savedLang === 'en') ? savedLang : 'es';
    });
    
    useEffect(() => {
        localStorage.setItem('capi-hely-lang', language);
        document.documentElement.lang = language;
    }, [language]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        if (supabase) {
            supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
            return () => subscription.unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (supabaseInitializationError) {
            setError(supabaseInitializationError);
            setIsLoading(false);
            return;
        }
        
        const fetchContent = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (!supabase) throw new Error("Supabase client not initialized.");
                const { data, error } = await supabase.from('landing_pages').select('content_data').eq('id', CONTENT_ID).single();
                if (error && error.code !== 'PGRST116') throw error;

                if (data?.content_data) {
                    const fetchedData = data.content_data;
                    const mergeRecursively = (initial: any, fetched: any): any => {
                        if (typeof initial !== 'object' || initial === null || Array.isArray(initial)) {
                            return fetched !== undefined ? fetched : initial;
                        }
                        const merged: { [key: string]: any } = { ...initial };
                        for (const key in initial) {
                            if (key in fetched) {
                                if (typeof initial[key] === 'object' && 'es' in initial[key] && typeof fetched[key] === 'string') {
                                    merged[key] = { ...initial[key], es: fetched[key] };
                                } else if (typeof initial[key] === 'object' && initial[key] !== null && typeof fetched[key] === 'object' && fetched[key] !== null) {
                                    merged[key] = mergeRecursively(initial[key], fetched[key]);
                                } else {
                                    merged[key] = fetched[key];
                                }
                            }
                        }
                        // Add new properties from fetched data that are not in initial data
                        for (const key in fetched) {
                           if (!(key in initial)) {
                               merged[key] = fetched[key];
                           }
                        }
                        return merged;
                    };
                    const mergedContent = mergeRecursively(initialContent, fetchedData);
                    setContent(mergedContent);
                } else {
                    await handleContentChange(initialContent, true);
                }
            } catch (err: any) {
                console.error("Error fetching content:", err);
                let message = err?.message || "Error desconocido.";
                setError(`Error al cargar contenido: ${message}. Por favor, revisa la configuración de Supabase y las políticas de seguridad (RLS).`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContent();
    }, []);

    const handleContentChange = async (newContent: typeof initialContent, isInitialSetup = false) => {
        if (supabaseInitializationError || !supabase) {
            setError(supabaseInitializationError || "Error: Supabase client not available.");
            return;
        }

        if(!isInitialSetup) setIsSaving(true);
        setError(null);
        try {
            const { error } = await supabase.from('landing_pages').upsert({ id: CONTENT_ID, content_data: newContent });
            if (error) throw error;
            setContent(newContent);
        } catch (err: any) {
            console.error("Error saving content:", err);
            setError(`Error al guardar: ${err.message}. Revisa la consola y las políticas de RLS.`);
        } finally {
            if(!isInitialSetup) setIsSaving(false);
        }
    };
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-amber-50">
                <style>{`
                    @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-30px); } 60% { transform: translateY(-15px); } }
                    .capybara-loader { animation: bounce 2s infinite; }
                `}</style>
                <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 capybara-loader" aria-label="Cargando contenido">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img"><title>Cargando...</title><path fill="#8c5a2b" d="M165.7,96.3c0,32.5-29.8,58.9-66.5,58.9S32.7,128.8,32.7,96.3c0-32.5,29.8-58.9,66.5-58.9 S165.7,63.8,165.7,96.3z" /><path fill="#7a4e24" d="M125.1,155.2c-15.1,5.1-31.5,5.1-46.6,0c-1.3-0.4-2.7,0.5-3.1,1.8c-0.4,1.3,0.5,2.7,1.8,3.1 c16.6,5.6,34.8,5.6,51.4,0c1.3-0.4,2.2-1.8,1.8-3.1C127.8,155.7,126.4,154.8,125.1,155.2z" /><circle fill="#442a12" cx="78.8" cy="89.4" r="7.2"/><circle fill="#442a12" cx="120.4" cy="89.4" r="7.2"/><path fill="#442a12" d="M99.6,112.5c-6.1,0-11,4.9-11,11c0,1.3,1.1,2.4,2.4,2.4h17.2c1.3,0,2.4-1.1,2.4-2.4 C110.6,117.4,105.7,112.5,99.6,112.5z"/><path fill="#d3a06a" d="M60.1,70.6c0,0-12.2-22.3-0.5-36.2s25.6-14.7,25.6-14.7s-3.7,20.8-12.2,32.5 C64.6,63.5,60.1,70.6,60.1,70.6z"/><path fill="#d3a06a" d="M139.1,70.6c0,0,12.2-22.3,0.5-36.2s-25.6-14.7-25.6-14.7s3.7,20.8,12.2,32.5 C134.6,63.5,139.1,70.6,139.1,70.6z"/></svg>
                    </div>
                    <h1 className="text-2xl font-bold text-orange-500">¡Las aventuras están llegando!</h1>
                    <p className="text-stone-600">Un momento, por favor.</p>
                </div>
            </div>
        );
    }
    
    if (error) {
         return (
            <div className="flex items-center justify-center h-screen bg-red-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold text-red-600">¡Oh no! Algo salió mal.</h1>
                    <p className="text-stone-700 mt-2 font-mono bg-red-100 p-3 rounded-md text-left">{error}</p>
                    <p className="text-sm text-stone-500 mt-4">Asegúrate de haber configurado correctamente las claves de Supabase y de haber seguido las instrucciones del "Editor de SQL" en el archivo `supabaseClient.ts`.</p>
                </div>
            </div>
        );
    }

    const { theme } = content;
    const themeStyles = {
        '--color-primary': theme.colors.primary, '--color-button': theme.colors.button, '--color-button-text': theme.colors.buttonText, '--color-offer': theme.colors.offer, '--color-offer-text': theme.colors.offerText,
    } as React.CSSProperties;

    const headerSection = content.sections.find(s => s.id === 'header');
    const footerSection = content.sections.find(s => s.id === 'footer');
    const mainSections = content.sections.filter(s => s.id !== 'header' && s.id !== 'footer');

    let visibleSectionIndex = 0;

    return (
        <div style={themeStyles} className="bg-amber-50 text-stone-800 antialiased">
            {headerSection?.isVisible && <Header {...getLocalizedProps(headerSection.props, language)} scrolled={scrolled} language={language} onLanguageChange={setLanguage} />}
            <main className="pt-20">
                {mainSections.map((section: Section) => {
                    if (!section.isVisible) return null;
                    const Component = componentMap[section.component];
                    if (!Component) return null;
                    const localizedProps = getLocalizedProps(section.props, language);

                    if (section.id === 'hero' || section.id === 'cta') {
                         return <Component key={section.id} {...localizedProps} />;
                    }
                    const bgColor = (visibleSectionIndex++ % 2 === 0) ? theme.secondaryBg : theme.primaryBg;
                    return (
                        <section key={section.id} id={section.id} className={`${bgColor} py-16 sm:py-20`}>
                            <Component {...localizedProps} />
                        </section>
                    );
                })}
            </main>
            
            {footerSection?.isVisible && <Footer {...getLocalizedProps(footerSection.props, language)} />}
            
            {isSaving && <div className="fixed bottom-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">Guardando...</div>}

            {session?.user?.aud === 'authenticated' && (
                <button onClick={() => setIsAdminPanelOpen(true)} className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition z-50" aria-label="Abrir panel de administración">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
            )}
            
            {isAdminPanelOpen && <AdminPanel content={content} onContentChange={handleContentChange} onClose={() => setIsAdminPanelOpen(false)} />}
        </div>
    );
};

export default App;
