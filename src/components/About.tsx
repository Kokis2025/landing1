import React from 'react';

interface AboutProps {
    iconUrl: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    signatureImgUrl: string;
    aboutImageUrl: string;
    characterName: string;
}

const About: React.FC<AboutProps> = ({ iconUrl, title, paragraph1, paragraph2, signatureImgUrl, aboutImageUrl, characterName }) => {
    return (
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="md:w-1/2 text-center">
                    <img src={iconUrl} alt={`Icono de la sección ${title}`} className="h-24 w-24 mx-auto mb-4 object-contain" />
                    <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{title}</h2>
                    <p className="text-lg text-stone-600 mb-4">
                        {paragraph1}
                    </p>
                    <p className="text-lg text-stone-600 mb-6">
                       {paragraph2}
                    </p>
                    <img src={signatureImgUrl} alt="Firma del Autor" className="h-20 mx-auto" />
                </div>
                <div className="md:w-1/2">
                    <div className="bg-amber-100 rounded-lg shadow-xl p-8">
                        <img
                            src={aboutImageUrl}
                            alt={characterName}
                            className="w-full h-auto rounded-lg object-cover"
                        />
                        <p className="text-center mt-4 font-bold text-stone-700 text-xl">{characterName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
