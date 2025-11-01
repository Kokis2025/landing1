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
                pageTitle: 'Las Aventuras de Capi y Hely'
            }
        },
        {
            id: 'hero',
            name: 'Hero',
            component: 'Hero',
            isVisible: true,
            props: {
                title: 'Historias que despiertan valores y abrazan la imaginación',
                subtitle: 'Descubre la serie ‘Las Aventuras de Capi y Hely’: cuentos que educan, inspiran y fortalecen el vínculo familiar.',
                ctaButtonText: 'Descubrir los libros',
                ctaButtonLink: '#books',
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
                title: 'Nuestros Libros',
                books: [
                    { id: 1, title: 'Las Aventuras de Capi, el capibara valiente', link: '#', store: 'Amazon', imageUrl: 'https://i.imgur.com/gK2x3nB.jpeg', rating: 5, backsideDescription: 'Una emocionante historia sobre valentía y amistad. Capi se embarca en una aventura para ayudar a sus amigos del bosque.' },
                    { id: 2, title: 'El Árbol Encantado, aventuras de Capi y Hely', link: '#', store: 'Amazon', imageUrl: 'https://i.imgur.com/gK2x3nB.jpeg', rating: 5, backsideDescription: 'Capi y Hely descubren un árbol mágico que les enseña sobre la importancia de cuidar la naturaleza y trabajar en equipo.' },
                    { id: 3, title: 'The Enchanted Tree – Adventures of Capi and Hely', link: '#', store: 'Amazon', imageUrl: 'https://i.imgur.com/gK2x3nB.jpeg', rating: 5, backsideDescription: 'The English version of the magical adventure. Perfect for bilingual families and young language learners!' },
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
                title: '¡Capi y Hely cobran vida!',
                description: 'Disfruta de un pequeño corto animado que te sumergirá en el mágico mundo de nuestros personajes. ¡Perfecto para ver en familia!',
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
                title: '¿Quiénes somos?',
                paragraph1: 'Hola, soy Jorge, autor y creador de contenido infantil apasionado por sembrar semillas de bondad y curiosidad en los más pequeños.',
                paragraph2: 'El propósito de esta serie es fomentar valores, potenciar la imaginación y promover el bienestar en niños de 4 a 9 años. Cada historia es una invitación a explorar emociones, aprender herramientas como la respiración consciente y, sobre todo, a compartir momentos mágicos en familia.',
                signatureImgUrl: 'https://i.imgur.com/g8nYgSg.png',
                aboutImageUrl: 'https://i.imgur.com/gK2x3nB.jpeg',
                characterName: 'Capi y Hely'
            }
        },
        {
            id: 'benefits',
            name: 'Beneficios',
            component: 'Benefits',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/eay7Hwz.png',
                title: 'Beneficios para tu Familia',
                items: [
                    { id: 1, icon: 'Heart', title: "Lectura Consciente", description: "Historias que abordan emociones y enseñan a gestionarlas con amor y empatía." },
                    { id: 2, icon: 'Leaf', title: "Relajación y Calma", description: "Incluye ejercicios de respiración y afirmaciones para encontrar la paz interior." },
                    { id: 3, icon: 'Users', title: "Conexión Familiar", description: "Crea un espacio de diálogo y complicidad entre padres, madres e hijos." },
                    { id: 4, icon: 'Badge', title: "Recomendado por Expertos", description: "Material avalado por educadores y terapeutas infantiles." },
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
                tag: 'BONUS GRATUITO',
                title: '¡Descarga tu Libro para Colorear!',
                description: 'Recibe un PDF gratuito con dibujos de Capi y Hely listos para colorear. ¡Una actividad perfecta para desatar la creatividad de tus pequeños artistas!',
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
                title: 'Testimonios Reales',
                items: [
                    { id: 1, quote: "Mi hijo espera con ansias la hora del cuento. Capi y Hely son sus nuevos héroes. ¡Una maravilla!", author: "Laura M.", location: "Madrid, España", avatarUrl: "https://i.imgur.com/O5t2n7g.jpeg" },
                    { id: 2, quote: "Como educadora, valoro el mensaje de fondo. Estos libros son herramientas fantásticas para el aula.", author: "Sofía G.", location: "Buenos Aires, Argentina", avatarUrl: "https://i.imgur.com/kP3B1fW.jpeg" },
                    { id: 3, quote: "Nos ha ayudado a hablar de emociones en casa de una forma sencilla y divertida. ¡Totalmente recomendado!", author: "Carlos R.", location: "Ciudad de México, México", avatarUrl: "https://i.imgur.com/h5y3O2V.jpeg" },
                    { id: 4, quote: "Los ejercicios de respiración son geniales. Mi hija los usa antes de dormir y está mucho más tranquila. ¡Gracias!", author: "Ana P.", location: "Santiago, Chile", avatarUrl: "" }
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
                title: 'Nuestra Garantía Ética',
                quote: 'Si no te inspira, te devolvemos la sonrisa',
                description: 'Estamos seguros del valor que estos cuentos aportarán a tu familia. Creemos en el poder de las historias para cambiar el mundo, empezando por el corazón de un niño.'
            }
        },
        {
            id: 'faq',
            name: 'Preguntas Frecuentes',
            component: 'Faq',
            isVisible: true,
            props: {
                iconUrl: 'https://i.imgur.com/V97H7s8.png',
                title: 'Preguntas Frecuentes',
                items: [
                    { id: 1, question: "¿Desde qué edad se recomiendan los libros?", answer: "La serie 'Las Aventuras de Capi y Hely' está pensada para niños y niñas de 4 a 9 años." },
                    { id: 2, question: "¿Cómo se reciben los libros?", answer: "Al comprar a través de Amazon o Lulu, recibirás la versión digital (ebook) directamente en tu dispositivo o cuenta." },
                    { id: 3, question: "¿Hay versión física de los libros?", answer: "Sí, tanto en Amazon como en Lulu puedes encontrar la opción de impresión bajo demanda." },
                    { id: 4, question: "¿Qué incluye el PDF gratuito?", answer: "El PDF gratuito es un libro de colorear con los personajes para que los niños se diviertan y desarrollen su creatividad." }
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
                title: 'Haz clic y transforma la lectura en bienestar',
                description: 'Únete a las familias que ya están disfrutando de momentos inolvidables con Capi y Hely.',
                primaryButtonText: 'Comprar los libros',
                secondaryButtonText: 'Descargar el PDF gratuito'
            }
        },
        {
            id: 'footer',
            name: 'Footer',
            component: 'Footer',
            isVisible: true,
            props: {
                quickLinks: {
                    title: 'Enlaces Rápidos',
                    links: [
                        { id: 1, text: 'Nuestros Libros', url: '#books' },
                        { id: 2, text: 'PDF Gratuito', url: '#bonus' },
                        { id: 3, text: 'Preguntas Frecuentes', url: '#faq' },
                    ]
                },
                stores: {
                    title: 'Tiendas',
                    links: [
                        { id: 1, text: 'Ver en Amazon', url: '#' },
                        { id: 2, text: 'Ver en Lulu', url: '#' },
                    ]
                },
                contact: {
                    title: 'Contacto y Redes',
                    email: 'contacto@autorjorge.com',
                    social: [
                        { id: 1, platform: 'Instagram', url: '#' },
                        { id: 2, platform: 'Facebook', url: '#' },
                    ]
                },
                copyrightText: '© {year} Las Aventuras de Capi y Hely. Todos los derechos reservados.'
            }
        }
    ]
};