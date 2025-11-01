import React from 'react';

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    location: string;
    avatarUrl: string;
}

interface TestimonialsProps {
    iconUrl: string;
    title: string;
    items: Testimonial[];
}

const QuoteIcon: React.FC = () => (
    <svg className="absolute top-0 left-0 w-16 h-16 text-[var(--color-primary)] opacity-10 transform -translate-x-6 -translate-y-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9.352 4C4.456 4 1 8.32 1 13.016c0 4.448 3.456 8.016 7.712 8.016 1.024 0 2.048-.192 3-.512-1.216-2.944-1.536-6.144.512-8.512C14.208 9.152 12.032 4 9.352 4zm16 0c-4.896 0-8.352 4.32-8.352 9.016 0 4.448 3.456 8.016 7.712 8.016 1.024 0 2.048-.192 3-.512-1.216-2.944-1.536-6.144.512-8.512C30.208 9.152 28.032 4 25.352 4z" />
    </svg>
);


const TestimonialCard: React.FC<Omit<Testimonial, 'id'>> = ({ quote, author, location, avatarUrl }) => (
    <div className="relative bg-white p-8 rounded-lg shadow-lg h-full">
        <QuoteIcon />
        <div className="relative z-10 flex flex-col h-full">
             <p className="text-stone-600 italic text-lg mb-4 flex-grow">“{quote}”</p>
            <div className="mt-4 flex items-center gap-4">
                 {avatarUrl ? (
                    <img src={avatarUrl} alt={`Foto de ${author}`} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                        <span>{author.charAt(0)}</span>
                    </div>
                )}
                <div>
                    <p className="font-bold text-stone-800">{author}</p>
                    <p className="text-sm text-stone-500">{location}</p>
                </div>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC<TestimonialsProps> = ({ iconUrl, title, items }) => {
    return (
        <div className="container mx-auto px-6">
            <div className="text-center mb-10 sm:mb-12">
                <img src={iconUrl} alt={`Icono de la sección ${title}`} className="h-24 w-24 mx-auto mb-4 object-contain" />
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {items.map((testimonial, index) => (
                    <div
                        key={testimonial.id}
                        style={{ animationDelay: `${index * 150}ms` }}
                        className={`animate-fade-in-up ${index % 2 !== 0 ? 'md:mt-8' : ''}`}
                    >
                        <TestimonialCard {...testimonial} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;