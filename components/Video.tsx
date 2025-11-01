import React from 'react';

interface VideoProps {
    iconUrl: string;
    title: string;
    description: string;
    videoId: string;
}

const Video: React.FC<VideoProps> = ({ iconUrl, title, description, videoId }) => {
    return (
        <div className="container mx-auto px-6">
            <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
                <img src={iconUrl} alt={`Icono de la sección ${title}`} className="h-24 w-24 mx-auto mb-4 object-contain" />
                <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{title}</h2>
                <p className="text-lg text-stone-600">{description}</p>
            </div>
            <div className="relative aspect-video max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Video;