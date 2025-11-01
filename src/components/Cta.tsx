
import React from 'react';

interface CtaProps {
    iconUrl: string;
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
}

const Cta: React.FC<CtaProps> = ({ iconUrl, title, description, primaryButtonText, secondaryButtonText }) => {
    return (
        <section 
            id="cta" 
            className="py-16 sm:py-20"
            style={{ 
                backgroundColor: 'var(--color-offer)', 
                color: 'var(--color-offer-text)'
            }}
        >
            <div className="container mx-auto px-6 text-center">
                <img src={iconUrl} alt={`Icono de la sección ${title}`} className="h-24 w-24 mx-auto mb-4 object-contain" />
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                    {title}
                </h2>
                <p className="max-w-2xl mx-auto text-lg opacity-90 mb-8">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a
                        href="#books"
                        style={{ color: 'var(--color-offer)'}}
                        className="w-full sm:w-auto bg-white hover:bg-amber-100 font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
                    >
                        {primaryButtonText}
                    </a>
                    <a
                        href="#bonus"
                        style={{ color: 'var(--color-offer-text)', borderColor: 'var(--color-offer-text)' }}
                        className="w-full sm:w-auto bg-transparent hover:bg-black/10 font-bold py-3 px-8 rounded-full border-2 shadow-md transition-all duration-300 ease-in-out"
                    >
                        {secondaryButtonText}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Cta;
