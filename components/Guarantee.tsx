import React from 'react';

interface GuaranteeProps {
    iconUrl: string;
    title: string;
    quote: string;
    description: string;
}

const Guarantee: React.FC<GuaranteeProps> = ({ iconUrl, title, quote, description }) => {
    return (
        <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
                <img src={iconUrl} alt={`Icono de la sección ${title}`} className="h-24 w-24 mx-auto mb-4 object-contain" />
                <h2 className="text-3xl font-bold text-stone-800 mb-4">{title}</h2>
                <p className="text-2xl text-stone-600 italic">
                    “{quote}”
                </p>
                <p className="mt-4 text-lg text-stone-600">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Guarantee;