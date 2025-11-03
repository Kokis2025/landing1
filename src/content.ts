export interface Section {
    id: string;
    name: string;
    component: string;
    props: any;
    isVisible: boolean;
}

export interface ColorScheme {
    primary: string;
    button: string;
    buttonText: string;
    offer: string;
    offerText: string;
}

export interface PredefinedScheme {
    id: string;
    name: string;
    colors: ColorScheme;
}

export const predefinedSchemes: PredefinedScheme[] = [
    {
        id: 'original',
        name: 'Capi y Hely Original',
        colors: {
            primary: '#f97316', // orange-500
            button: '#facc15', // yellow-400
            buttonText: '#44403c', // stone-800
            offer: '#ea580c', // orange-600
            offerText: '#ffffff',
        }
    },
    {
        id: 'azul-profesional',
        name: 'Azul Profesional',
        colors: {
            primary: '#2563eb', // blue-600
            button: '#3b82f6', // blue-500
            buttonText: '#ffffff',
            offer: '#1d4ed8', // blue-700
            offerText: '#ffffff',
        }
    },
    {
        id: 'verde-natural',
        name: 'Verde Natural',
        colors: {
            primary: '#16a34a', // green-600
            button: '#22c55e', // green-500
            buttonText: '#ffffff',
            offer: '#15803d', // green-700
            offerText: '#ffffff',
        }
    },
    {
        id: 'purpura-moderno',
        name: 'Púrpura Moderno',
        colors: {
            primary: '#9333ea', // purple-600
            button: '#a855f7', // purple-500
            buttonText: '#ffffff',
            offer: '#7e22ce', // purple-700
            offerText: '#ffffff',
        }
    }
];

export const initialContent = {
    theme: {
        primaryBg: 'bg-white',
        secondaryBg: 'bg-amber-100/50',
        activeSchemeId: 'original',
        colors: predefinedSchemes.find(s => s.id === 'original')!.colors,
    },
    sections: [
        {
            id: 'header',
            name: 'Encabezado',
            component: 'Header',
            isVisible: true,
            props: {
                logoUrl: 'https://i.imgur.com/3Z6k85v.png',
                pageTitle: {
                    es: 'Las Aventuras de Capi y Hely',
                    en: 'The Adventures of Capi and Hely'
                },
                alignment: 'left'
            }
        },
        {
            id: 'hero',
            name: 'Hero',
            component: 'Hero',
            isVisible: true,
            props: {
                title: {
                    es: 'Historias que despiertan valores y abrazan la imaginación',
                    en: 'Stories that awaken values and embrace imagination'
                },
                subtitle: {
                    es: 'Descubre la serie ‘Las Aventuras de Capi y Hely’: cuentos que educan, inspiran y fortalecen el vínculo familiar.',
                    en: 'Discover the series ‘The Adventures of Capi and Hely’: stories that educate, inspire, and strengthen family bonds.'
                },
                ctaButtonText: {
                    es: 'Descubrir los libros',
                    en: 'Discover the books'
                },
                ctaButtonLink: '#books',
                isCtaButtonVisible: true,
                leftImageUrl: 'https://i.imgur.com/i3aD4l4.jpeg',
                rightImageUrl: 'https://i.imgur.com/gK2x3nB.jpeg'
            }
        },
        {
            id: 'books',
            name: 'Nuestros Libros',
            component: 'Books',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/3c83aJ0.png',
                title: {
                    es: 'Nuestros Libros',
                    en: 'Our Books'
                },
                bookSections: [
                    { 
                        id: 1, 
                        title: {
                            es: 'Libros Impresos',
                            en: 'Printed Books'
                        }, 
                        books: [
                            { id: 1, title: { es: 'Las Aventuras de Capi, el capibara valiente', en: 'The Adventures of Capi, the Brave Capybara' }, link: '#', store: { es: 'Amazon', en: 'Amazon' }, imageUrl: 'https://i.imgur.com/gK2x3nB.jpeg', rating: 5, backsideDescription: { es: 'Una emocionante historia sobre valentía y amistad. Capi se embarca en una aventura para ayudar a sus amigos del bosque.', en: 'An exciting story about courage and friendship. Capi embarks on an adventure to help his forest friends.' } },
                            { id: 2, title: { es: 'El Árbol Encantado, aventuras de Capi y Hely', en: 'The Enchanted Tree, Adventures of Capi and Hely' }, link: '#', store: { es: 'Amazon', en: 'Amazon' }, imageUrl: 'https://i.imgur.com/gK2x3nB.jpeg', rating: 5, backsideDescription: { es: 'Capi y Hely descubren un árbol mágico que les enseña sobre la importancia de cuidar la naturaleza y trabajar en equipo.', en: 'Capi and Hely discover a magical tree that teaches them about the importance of caring for nature and teamwork.' } },
                            { id: 3, title: { es: 'The Enchanted Tree – Adventures of Capi and Hely', en: 'The Enchanted Tree – Adventures of Capi and Hely' }, link: '#', store: { es: 'Amazon', en: 'Amazon' }, imageUrl: 'https://i.imgur.com/gK2x3nB.jpeg', rating: 5, backsideDescription: { es: 'La versión en inglés de la mágica aventura. ¡Perfecto para familias bilingües y jóvenes aprendices de idiomas!', en: 'The English version of the magical adventure. Perfect for bilingual families and young language learners!' } },
                        ]
                    },
                    {
                        id: 2,
                        title: {
                            es: 'eBooks',
                            en: 'eBooks'
                        },
                        books: []
                    }
                ]
            }
        },
        {
            id: 'video',
            name: 'Conoce a Capi',
            component: 'Video',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/5u9y2fF.png',
                title: {
                    es: '¡Capi y Hely cobran vida!',
                    en: 'Capi and Hely Come to Life!'
                },
                description: {
                    es: 'Disfruta de un pequeño corto animado que te sumergirá en el mágico mundo de nuestros personajes. ¡Perfecto para ver en familia!',
                    en: 'Enjoy a short animated film that will immerse you in the magical world of our characters. Perfect for family viewing!'
                },
                videoId: 'DR_8422d354'
            }
        },
        {
            id: 'about',
            name: '¿Quiénes somos?',
            component: 'About',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/sC22J4s.png',
                title: {
                    es: '¿Quiénes somos?',
                    en: 'Who We Are'
                },
                paragraph1: {
                    es: 'Hola, soy Jorge, autor y creador de contenido infantil apasionado por sembrar semillas de bondad y curiosidad en los más pequeños.',
                    en: 'Hello, I\'m Jorge, an author and creator of children\'s content passionate about planting seeds of kindness and curiosity in little ones.'
                },
                paragraph2: {
                    es: 'El propósito de esta serie es fomentar valores, potenciar la imaginación y promover el bienestar en niños de 4 a 9 años. Cada historia es una invitación a explorar emociones, aprender herramientas como la respiración consciente y, sobre todo, a compartir momentos mágicos en familia.',
                    en: 'The purpose of this series is to foster values, enhance imagination, and promote well-being in children aged 4 to 9. Each story is an invitation to explore emotions, learn tools like mindful breathing, and, above all, share magical moments as a family.'
                },
                signatureImgUrl: 'https://i.imgur.com/g8nYgSg.png',
                aboutImageUrl: 'https://i.imgur.com/gK2x3nB.jpeg',
                characterName: {
                    es: 'Capi y Hely',
                    en: 'Capi and Hely'
                }
            }
        },
        {
            id: 'benefits',
            name: 'Beneficios',
            component: 'Benefits',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/eay7Hwz.png',
                title: {
                    es: 'Beneficios para tu Familia',
                    en: 'Benefits for Your Family'
                },
                items: [
                    { id: 1, icon: 'Heart', title: { es: "Lectura Consciente", en: "Mindful Reading" }, description: { es: "Historias que abordan emociones y enseñan a gestionarlas con amor y empatía.", en: "Stories that address emotions and teach how to manage them with love and empathy." } },
                    { id: 2, icon: 'Leaf', title: { es: "Relajación y Calma", en: "Relaxation and Calm" }, description: { es: "Incluye ejercicios de respiración y afirmaciones para encontrar la paz interior.", en: "Includes breathing exercises and affirmations to find inner peace." } },
                    { id: 3, icon: 'Users', title: { es: "Conexión Familiar", en: "Family Connection" }, description: { es: "Crea un espacio de diálogo y complicidad entre padres, madres e hijos.", en: "Creates a space for dialogue and connection between parents and children." } },
                    { id: 4, icon: 'Badge', title: { es: "Recomendado por Expertos", en: "Recommended by Experts" }, description: { es: "Material avalado por educadores y terapeutas infantiles.", en: "Content endorsed by educators and child therapists." } },
                ]
            }
        },
        {
            id: 'bonus',
            name: 'Bonus Gratuito',
            component: 'Bonus',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/f02yLd1.png',
                tag: {
                    es: 'BONUS GRATUITO',
                    en: 'FREE BONUS'
                },
                title: {
                    es: '¡Descarga tu Libro para Colorear!',
                    en: 'Download Your Coloring Book!'
                },
                description: {
                    es: 'Recibe un PDF gratuito con dibujos de Capi y Hely listos para colorear. ¡Una actividad perfecta para desatar la creatividad de tus pequeños artistas!',
                    en: 'Receive a free PDF with drawings of Capi and Hely ready to color. A perfect activity to unleash your little artists\' creativity!'
                },
                imageUrls: [
                    'https://i.imgur.com/sC22J4s.png',
                    'https://i.imgur.com/gK2x3nB.jpeg',
                    'https://i.imgur.com/i3aD4l4.jpeg'
                ],
                cardGradientStart: '#fde68a', // yellow-200
                cardGradientEnd: '#fca5a5', // red-300
                cardIconUrl: 'https://i.imgur.com/Q2yAgK6.png'
            }
        },
        {
            id: 'testimonials',
            name: 'Testimonios',
            component: 'Testimonials',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/M6NfSg1.png',
                title: {
                    es: 'Testimonios Reales',
                    en: 'Real Testimonials'
                },
                items: [
                    { id: 1, quote: { es: "Mi hijo espera con ansias la hora del cuento. Capi y Hely son sus nuevos héroes. ¡Una maravilla!", en: "My son eagerly awaits story time. Capi and Hely are his new heroes. It's wonderful!" }, author: { es: "Laura M.", en: "Laura M." }, location: { es: "Madrid, España", en: "Madrid, Spain" }, avatarUrl: "https://i.imgur.com/O5t2n7g.jpeg" },
                    { id: 2, quote: { es: "Como educadora, valoro el mensaje de fondo. Estos libros son herramientas fantásticas para el aula.", en: "As an educator, I value the underlying message. These books are fantastic tools for the classroom." }, author: { es: "Sofía G.", en: "Sofia G." }, location: { es: "Buenos Aires, Argentina", en: "Buenos Aires, Argentina" }, avatarUrl: "https://i.imgur.com/kP3B1fW.jpeg" },
                    { id: 3, quote: { es: "Nos ha ayudado a hablar de emociones en casa de una forma sencilla y divertida. ¡Totalmente recomendado!", en: "It has helped us talk about emotions at home in a simple and fun way. Highly recommended!" }, author: { es: "Carlos R.", en: "Carlos R." }, location: { es: "Ciudad de México, México", en: "Mexico City, Mexico" }, avatarUrl: "https://i.imgur.com/h5y3O2V.jpeg" },
                    { id: 4, quote: { es: "Los ejercicios de respiración son geniales. Mi hija los usa antes de dormir y está mucho más tranquila. ¡Gracias!", en: "The breathing exercises are great. My daughter uses them before bed and she is much calmer. Thank you!" }, author: { es: "Ana P.", en: "Ana P." }, location: { es: "Santiago, Chile", en: "Santiago, Chile" }, avatarUrl: "" }
                ]
            }
        },
        {
            id: 'guarantee',
            name: 'Garantía',
            component: 'Guarantee',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/aDDUx12.png',
                title: {
                    es: 'Nuestra Garantía Ética',
                    en: 'Our Ethical Guarantee'
                },
                quote: {
                    es: 'Si no te inspira, te devolvemos la sonrisa',
                    en: 'If it doesn\'t inspire you, we\'ll give you back your smile'
                },
                description: {
                    es: 'Estamos seguros del valor que estos cuentos aportarán a tu familia. Creemos en el poder de las historias para cambiar el mundo, empezando por el corazón de un niño.',
                    en: 'We are confident in the value these stories will bring to your family. We believe in the power of stories to change the world, starting with a child\'s heart.'
                }
            }
        },
        {
            id: 'faq',
            name: 'Preguntas Frecuentes',
            component: 'Faq',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/V97H7s8.png',
                title: {
                    es: 'Preguntas Frecuentes',
                    en: 'Frequently Asked Questions'
                },
                items: [
                    { id: 1, question: { es: "¿Desde qué edad se recomiendan los libros?", en: "From what age are the books recommended?" }, answer: { es: "La serie 'Las Aventuras de Capi y Hely' está pensada para niños y niñas de 4 a 9 años.", en: "The 'Adventures of Capi and Hely' series is designed for children aged 4 to 9." } },
                    { id: 2, question: { es: "¿Cómo se reciben los libros?", en: "How are the books delivered?" }, answer: { es: "Al comprar a través de Amazon o Lulu, recibirás la versión digital (ebook) directamente en tu dispositivo o cuenta.", en: "When purchasing through Amazon or Lulu, you will receive the digital version (ebook) directly to your device or account." } },
                    { id: 3, question: { es: "¿Hay versión física de los libros?", en: "Is there a physical version of the books?" }, answer: { es: "Sí, tanto en Amazon como en Lulu puedes encontrar la opción de impresión bajo demanda.", en: "Yes, you can find the print-on-demand option on both Amazon and Lulu." } },
                    { id: 4, question: { es: "¿Qué incluye el PDF gratuito?", en: "What does the free PDF include?" }, answer: { es: "El PDF gratuito es un libro de colorear con los personajes para que los niños se diviertan y desarrollen su creatividad.", en: "The free PDF is a coloring book with the characters for children to have fun and develop their creativity." } }
                ]
            }
        },
        {
            id: 'cta',
            name: 'Llamado a la Acción',
            component: 'Cta',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/k6Lz1nL.png',
                title: {
                    es: 'Haz clic y transforma la lectura en bienestar',
                    en: 'Click and transform reading into well-being'
                },
                description: {
                    es: 'Únete a las familias que ya están disfrutando de momentos inolvidables con Capi y Hely.',
                    en: 'Join the families who are already enjoying unforgettable moments with Capi and Hely.'
                },
                primaryButtonText: {
                    es: 'Comprar los libros',
                    en: 'Buy the books'
                },
                secondaryButtonText: {
                    es: 'Descargar el PDF gratuito',
                    en: 'Download the free PDF'
                }
            }
        },
        {
            id: 'footer',
            name: 'Footer',
            component: 'Footer',
            isVisible: true,
            props: {
                quickLinks: {
                    title: {
                        es: 'Enlaces Rápidos',
                        en: 'Quick Links'
                    },
                    links: [
                        { id: 1, text: { es: 'Nuestros Libros', en: 'Our Books' }, url: '#books' },
                        { id: 2, text: { es: 'PDF Gratuito', en: 'Free PDF' }, url: '#bonus' },
                        { id: 3, text: { es: 'Preguntas Frecuentes', en: 'FAQ' }, url: '#faq' },
                    ]
                },
                stores: {
                    title: {
                        es: 'Tiendas',
                        en: 'Stores'
                    },
                    links: [
                        { id: 1, text: { es: 'Ver en Amazon', en: 'View on Amazon' }, url: '#' },
                        { id: 2, text: { es: 'Ver en Lulu', en: 'View on Lulu' }, url: '#' },
                    ]
                },
                contact: {
                    title: {
                        es: 'Contacto y Redes',
                        en: 'Contact & Social'
                    },
                    email: 'contacto@autorjorge.com',
                    social: [
                        { id: 1, platform: 'Instagram', url: '#' },
                        { id: 2, platform: 'Facebook', url: '#' },
                    ]
                },
                copyrightText: {
                    es: '© {year} Las Aventuras de Capi y Hely. Todos los derechos reservados.',
                    en: '© {year} The Adventures of Capi and Hely. All rights reserved.'
                }
            }
        }
    ]
};