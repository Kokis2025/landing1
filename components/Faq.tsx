import React, { useState } from 'react';

interface FaqItemData {
    id: number;
    question: string;
    answer: string;
}

interface FaqProps {
    iconUrl: string;
    title: string;
    items: FaqItemData[];
}

const FaqItem: React.FC<Omit<FaqItemData, 'id'>> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-stone-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
            >
                <h3 className="text-lg font-bold text-stone-800">{question}</h3>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <p className="text-stone-600">{answer}</p>
            </div>
        </div>
    );
};

const Faq: React.FC<FaqProps> = ({ iconUrl, title, items }) => {
    return (
        <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-10 sm:mb-12">
                <img src={iconUrl} alt={`Icono de la sección ${title}`} className="h-24 w-24 mx-auto mb-4 object-contain" />
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">{title}</h2>
            </div>
            <div>
                {items.map((item) => (
                    <FaqItem key={item.id} question={item.question} answer={item.answer} />
                ))}
            </div>
        </div>
    );
};

export default Faq;