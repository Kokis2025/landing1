

import React from 'react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
);
const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
);

interface Link {
    id: number;
    text: string;
    url: string;
}

interface SocialLink {
    id: number;
    platform: 'Instagram' | 'Facebook';
    url: string;
}

interface FooterProps {
    quickLinks: { title: string; links: Link[] };
    stores: { title: string; links: Link[] };
    contact: { title: string; email: string; social: SocialLink[] };
    copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({ quickLinks, stores, contact, copyrightText }) => {
    return (
        <footer className="bg-stone-800 text-stone-300 py-10 sm:py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h4 className="font-bold text-lg text-white mb-4">{quickLinks.title}</h4>
                        <ul className="space-y-2">
                            {quickLinks.links.map(link => (
                                <li key={link.id}><a href={link.url} className="hover:text-[var(--color-primary)] transition-colors">{link.text}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-white mb-4">{stores.title}</h4>
                        <ul className="space-y-2">
                             {stores.links.map(link => (
                                <li key={link.id}><a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">{link.text}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-white mb-4">{contact.title}</h4>
                         <p>{contact.email}</p>
                        <div className="flex justify-center md:justify-start gap-4 mt-4">
                           {contact.social.map(social => (
                               <a key={social.id} href={social.url} aria-label={social.platform} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">
                                   {social.platform === 'Instagram' && <InstagramIcon className="w-6 h-6" />}
                                   {social.platform === 'Facebook' && <FacebookIcon className="w-6 h-6" />}
                               </a>
                           ))}
                        </div>
                    </div>
                </div>
                <div className="text-center text-stone-500 mt-12 border-t border-stone-700 pt-8">
                    <p>{copyrightText.replace('{year}', new Date().getFullYear().toString())}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
