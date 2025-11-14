
import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = useCallback((key: TranslationKey, replacements: Record<string, string | number> = {}) => {
    let translation = translations[language][key] || translations['zh'][key];
    
    Object.keys(replacements).forEach(placeholder => {
        const regex = new RegExp(`{${placeholder}}`, 'g');
        translation = translation.replace(regex, String(replacements[placeholder]));
    });

    return translation;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
