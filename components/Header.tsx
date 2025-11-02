import React from 'react';

interface HeaderProps {
    logoUrl: string;
    pageTitle: string;
    scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ logoUrl, pageTitle, scrolled }) => {
    return (
        <header className={`fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md h-20 flex items-center transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
            <div className="container mx-auto px-6 flex items-center">
                <div className="flex items-center gap-3">
                    <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
                    <span className="text-lg sm:text-xl font-bold text-stone-800">{pageTitle}</span>
                </div>
                {/* Futuros enlaces de navegación podrían ir aquí */}
            </div>
        </header>
    );
};

export default Header;