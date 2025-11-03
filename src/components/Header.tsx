import React from 'react';

type Language = 'es' | 'en';

interface HeaderProps {
    logoUrl: string;
    pageTitle: string;
    scrolled: boolean;
    language: Language;
    onLanguageChange: (lang: Language) => void;
    alignment: 'left' | 'center';
}

const LanguageButton: React.FC<{
    lang: Language;
    currentLang: Language;
    onClick: (lang: Language) => void;
    children: React.ReactNode;
}> = ({ lang, currentLang, onClick, children }) => {
    const isActive = lang === currentLang;
    return (
        <button
            onClick={() => onClick(lang)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                isActive
                    ? 'font-bold text-indigo-600'
                    : 'text-stone-500 hover:text-stone-800'
            }`}
        >
            {children}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ logoUrl, pageTitle, scrolled, language, onLanguageChange, alignment = 'left' }) => {
    
    const LogoTitle = () => (
        <a href="/" className="flex items-center gap-3">
            <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
            <span className="text-lg sm:text-xl font-bold text-stone-800">{pageTitle}</span>
        </a>
    );
    
    return (
        <header className={`fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md h-20 flex items-center transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
            <div className="container mx-auto px-6 grid grid-cols-3 items-center h-full">
                <div className="justify-self-start col-start-1">
                    {alignment === 'left' && <LogoTitle />}
                </div>

                <div className="justify-self-center col-start-2">
                    {alignment === 'center' && <LogoTitle />}
                </div>
                
                <div className="flex items-center gap-1 justify-self-end col-start-3">
                    <LanguageButton lang="es" currentLang={language} onClick={onLanguageChange}>
                        ES
                    </LanguageButton>
                    <span className="text-stone-300">|</span>
                    <LanguageButton lang="en" currentLang={language} onClick={onLanguageChange}>
                        EN
                    </LanguageButton>
                </div>
            </div>
        </header>
    );
};

export default Header;
