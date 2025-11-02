import React, { useRef } from 'react';

interface Book {
    id: number;
    title: string;
    link: string;
    store: string;
    imageUrl: string;
    rating: number; // 0-5
    backsideDescription: string;
}

interface BookSection {
    id: number;
    title: string;
    books: Book[];
}

interface BooksProps {
    iconUrl: string;
    title: string;
    bookSections: BookSection[];
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
    <div className="bg-white rounded-lg shadow-lg p-4 text-center flex flex-col h-full">
        <div className="group [perspective:1000px] mb-3">
            <div className="relative w-full h-80 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 [backface-visibility:hidden]">
                    <img src={imageUrl} alt={title} className="w-full h-full object-contain rounded-md"/>
                </div>
                <div className="absolute inset-0 bg-amber-50 rounded-lg p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center">
                    <p className="text-stone-600 text-center italic">
                        {backsideDescription}
                    </p>
                </div>
            </div>
        </div>
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

const BookCarousel: React.FC<{ books: Book[] }> = ({ books }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth * 0.9; // Scroll by 90% of the container width
            carouselRef.current.scrollBy({ 
                left: direction === 'left' ? -scrollAmount : scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };

    if (!books || books.length === 0) {
        return <p className="text-center text-stone-500 italic">Próximamente más libros en esta sección.</p>;
    }
    
    // Determine if arrows should be visible. This is a simple heuristic.
    // A more robust solution might use ResizeObserver.
    const showArrows = true; // Let's show them and CSS will hide on small screens if needed

    return (
        <div className="relative">
            {showArrows && (
                <>
                    <button onClick={() => scroll('left')} className="absolute top-1/2 -left-4 z-10 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]" aria-label="Anterior">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => scroll('right')} className="absolute top-1/2 -right-4 z-10 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]" aria-label="Siguiente">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </>
            )}
            <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 -mb-6 gap-6"
            >
                {books.map((book) => (
                    <div key={book.id} className="snap-center flex-shrink-0 w-4/5 sm:w-1/2 md:w-1/3 p-2">
                        <BookCard {...book} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Books: React.FC<BooksProps> = ({ iconUrl, title, bookSections }) => {
    return (
        <div className="container mx-auto px-6">
            <div className="text-center mb-10 sm:mb-12">
                <img src={iconUrl} alt={`Icono de la sección ${title}`} className="h-24 w-24 mx-auto mb-4 object-contain" />
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">{title}</h2>
            </div>
            <div className="space-y-12">
                {bookSections?.map((section) => (
                    section.books && (
                        <div key={section.id}>
                            <h3 className="text-2xl font-bold text-stone-800 text-center mb-8">{section.title}</h3>
                            <BookCarousel books={section.books} />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Books;