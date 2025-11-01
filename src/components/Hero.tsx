import React from 'react';

interface HeroProps {
    title: string;
    subtitle: string;
    leftImageUrl: string;
    rightImageUrl: string;
    ctaButtonText: string;
    ctaButtonLink: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, leftImageUrl, rightImageUrl, ctaButtonText, ctaButtonLink }) => {
    return (
        <section className="relative w-full flex flex-col md:flex-row items-stretch bg-amber-50" style={{ minHeight: '80vh' }}>
            {/* Left side with text and background image */}
            <div 
                className="relative w-full md:w-1/2 flex items-center justify-center text-left p-6 sm:p-8 md:p-12 bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url(${leftImageUrl})` }}
            >
                <div className="absolute inset-0 bg-black/30"></div> {/* Dark overlay for text readability */}
                <div className="relative z-10 text-white max-w-xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.6)' }}>
                        {subtitle}
                    </p>
                    <a
                        href={ctaButtonLink}
                        style={{ 
                            backgroundColor: 'var(--color-button)', 
                            color: 'var(--color-button-text)' 
                        }}
                        className="font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 hover:brightness-95 duration-300 ease-in-out shadow-lg hover:shadow-xl inline-block"
                    >
                        {ctaButtonText}
                    </a>
                </div>
            </div>

            {/* Right side with image */}
            <div className="w-full md:w-1/2 h-96 md:h-auto">
                <img 
                    src={rightImageUrl} 
                    alt="Capi y Hely en un prado de flores" 
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
};

export default Hero;
