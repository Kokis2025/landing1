import React, { useState, useEffect, useRef } from 'react';

interface BonusProps {
    iconUrl: string;
    tag: string;
    title: string;
    description: string;
    imageUrls: string[];
    cardGradientStart: string;
    cardGradientEnd: string;
    cardIconUrl: string;
}

const Bonus: React.FC<BonusProps> = ({ iconUrl, tag, title, description, imageUrls, cardGradientStart, cardGradientEnd, cardIconUrl }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const hasImages = imageUrls && imageUrls.length > 0;
    const [currentIndex, setCurrentIndex] = useState(hasImages ? 1 : 0);
    const [isHovered, setIsHovered] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const timeoutRef = useRef<number | null>(null);
    const slideRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(0);

    // Mide dinámicamente el ancho de una tarjeta para un cálculo de desplazamiento robusto
    useEffect(() => {
        if (slideRef.current) {
            setCardWidth(slideRef.current.offsetWidth);
        }
        const handleResize = () => {
             if (slideRef.current) {
                setCardWidth(slideRef.current.offsetWidth);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imageUrls]);

    // Crea un array extendido para el bucle infinito: [última, ...originales, primera]
    const slideImages = hasImages ? [imageUrls[imageUrls.length - 1], ...imageUrls, imageUrls[0]] : [];

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
    
    const handleNext = () => {
        if (!hasImages) return;
        setCurrentIndex(prevIndex => prevIndex + 1);
        resetTimeout();
    };

    const handlePrev = () => {
        if (!hasImages) return;
        setCurrentIndex(prevIndex => prevIndex - 1);
        resetTimeout();
    };

    // Efecto para el auto-desplazamiento
    useEffect(() => {
        resetTimeout();
        if (!isHovered && hasImages && cardWidth > 0) {
            timeoutRef.current = window.setTimeout(
                () => handleNext(),
                3500 // Cambia cada 3.5 segundos
            );
        }
        return () => {
            resetTimeout();
        };
    }, [currentIndex, isHovered, hasImages, cardWidth]);

    // Maneja el "salto" para el bucle infinito al final de la transición
    const handleTransitionEnd = () => {
        if (currentIndex === 0) {
            setIsTransitioning(false);
            setCurrentIndex(imageUrls.length);
        } else if (currentIndex === imageUrls.length + 1) {
            setIsTransitioning(false);
            setCurrentIndex(1);
        }
    };
    
    // Reactiva la transición después del "salto"
    useEffect(() => {
        if (!isTransitioning) {
            const timer = setTimeout(() => setIsTransitioning(true), 50);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isTransitioning]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ name, email });
        setSubmitted(true);
    };

    return (
        <div className="container mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 flex flex-col items-center text-center gap-6 sm:gap-8">
                {/* Header Content */}
                <div className="w-full max-w-2xl">
                    <img src={iconUrl} alt={`Icono de la sección ${title}`} className="h-24 w-24 mx-auto mb-4 object-contain" />
                    <span className="text-green-500 font-bold">{tag}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mt-2 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-stone-600">
                        {description}
                    </p>
                </div>

                {/* Carousel with controls */}
                 <div 
                    className="relative w-full max-w-5xl mx-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="overflow-hidden">
                        <div
                            className="flex"
                            style={{
                                transform: cardWidth > 0 ? `translateX(-${currentIndex * cardWidth}px)` : 'none',
                                transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none',
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {slideImages.map((url, index) => (
                                <div ref={index === 0 ? slideRef : null} key={index} className="flex-shrink-0 w-full sm:w-96 p-2 sm:p-4">
                                     <div
                                        className="rounded-2xl p-4 shadow-lg w-full aspect-square flex items-center justify-center relative"
                                        style={{ background: `linear-gradient(to bottom right, ${cardGradientStart}, ${cardGradientEnd})` }}
                                    >
                                        <div className="bg-white rounded-xl shadow-md w-full h-full p-1"> 
                                            <img 
                                                src={url} 
                                                alt={`Ilustración para colorear ${index}`} 
                                                className="w-full h-full object-contain rounded-lg" 
                                            />
                                        </div>
                                        <img 
                                            src={cardIconUrl}
                                            alt="Icono de pintar"
                                            className="absolute bottom-2 right-2 w-20 h-20 sm:w-24 sm:h-24 object-contain"
                                            style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.4))' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {hasImages && (
                        <>
                            <button onClick={handlePrev} className="absolute top-1/2 left-2 sm:left-0 -translate-y-1/2 sm:-translate-x-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]" aria-label="Anterior">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={handleNext} className="absolute top-1/2 right-2 sm:right-0 -translate-y-1/2 sm:translate-x-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]" aria-label="Siguiente">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </>
                    )}
                </div>


                {/* Form */}
                <div className="w-full max-w-md mt-4">
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: 'var(--color-offer)',
                                    color: 'var(--color-offer-text)'
                                }}
                                className="font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:brightness-95 duration-300"
                            >
                                Descargar ahora
                            </button>
                        </form>
                    ) : (
                        <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
                            <h3 className="font-bold text-lg">¡Gracias!</h3>
                            <p>Tu PDF gratuito está en camino. Revisa tu correo electrónico.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bonus;
