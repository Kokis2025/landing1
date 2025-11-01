import React from 'react';

interface Book {
    id: number;
    title: string;
    link: string;
    store: string;
    imageUrl: string;
    rating: number; // 0-5
    backsideDescription: string;
}

interface BooksProps {
    iconUrl: string;
    title: string;
    books: Book[];
}

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-stone-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
);

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < rating} />
        ))}
    </div>
);

const BookCard: React.FC<Book> = ({ title, link, store, imageUrl, rating, backsideDescription }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 text-center flex flex-col">
        {/* Flippable Image Container */}
        <div className="group [perspective:1000px] mb-3">
            <div className="relative w-full h-80 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Side - Image */}
                <div className="absolute inset-0 [backface-visibility:hidden]">
                    <img src={imageUrl} alt={title} className="w-full h-full object-contain rounded-md"/>
                </div>
                {/* Back Side - Description */}
                <div className="absolute inset-0 bg-amber-50 rounded-lg p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center">
                    <p className="text-stone-600 text-center italic">
                        {backsideDescription}
                    </p>
                </div>
            </div>
        </div>

        {/* Static Content */}
        <h3 className="text-md font-bold text-stone-800 mb-2 flex-grow">{title}</h3>
        {rating > 0 && <StarRating rating={rating} />}
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
                backgroundColor: 'var(--color-button)', 
                color: 'var(--color-button-text)' 
            }}
            className="mt-auto font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:brightness-95"
        >
            Ver en {store}
        </a>
    </div>
);


const Books: React.FC<BooksProps> = ({ iconUrl, title, books }) => {
    return (
        <div className="container mx-auto px-6">
            <div className="text-center mb-10 sm:mb-12">
                <img src={iconUrl} alt={`Icono de la sección ${title}`} className="h-24 w-24 mx-auto mb-4 object-contain" />
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {books.map((book) => (
                    <BookCard key={book.id} {...book} />
                ))}
            </div>
        </div>
    );
};

export default Books;