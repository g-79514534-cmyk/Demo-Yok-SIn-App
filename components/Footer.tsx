
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
    const { t } = useLanguage();
    const year = new Date().getFullYear();
    
    // Using dangerouslySetInnerHTML to correctly render the &copy; HTML entity from the translation string.
    // This is safe because the string content is controlled internally.
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <p 
                  className="text-center text-sm text-gray-400"
                  dangerouslySetInnerHTML={{ __html: t('footerText', { year: year.toString() }) }}
                />
            </div>
        </footer>
    );
};
