
import React, { useState, useMemo } from 'react';
import { useSeatingData } from '../hooks/useSeatingData';
import type { SeatingRecord } from '../types';
import { Icon } from '../components/icons';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../i18n/translations';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const languages: { code: Language; name: string }[] = [
        { code: 'zh', name: '中文' },
        { code: 'en', name: 'English' },
        { code: 'ms', name: 'Bahasa Melayu' },
    ];

    return (
        <div className="flex justify-center space-x-2">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        language === lang.code
                            ? 'bg-brand-gold text-white font-semibold shadow-md'
                            : 'bg-white/20 text-white hover:bg-white/40'
                    }`}
                >
                    {lang.name}
                </button>
            ))}
        </div>
    );
};

const ResultCard: React.FC<{ record: SeatingRecord }> = ({ record }) => {
    const { t } = useLanguage();
    return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border-l-8 border-brand-gold">
        <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0 bg-brand-red text-white rounded-full p-3">
                    <Icon type="user" className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{record.name}</h3>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center text-lg text-gray-700 mt-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                    <span>{t('seatNumberLabel')}: <span className="font-semibold text-brand-red">{record.seat}</span></span>
                </div>
            </div>
        </div>
    </div>
    );
};

const HomePage: React.FC = () => {
    const { seatingData, isLoading } = useSeatingData();
    const [query, setQuery] = useState('');
    const { t } = useLanguage();

    const filteredData = useMemo(() => {
        if (!query.trim()) return [];
        const lowerCaseQuery = query.toLowerCase().trim();
        return seatingData.filter(
            (record) =>
                record.name.toLowerCase().includes(lowerCaseQuery)
        );
    }, [query, seatingData]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // The filtering is already memoized, so this is just for form submission behavior
    };
    
    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center text-white"><p>{t('loadingData')}</p></div>;
        }

        if (seatingData.length === 0) {
            return (
                <div className="text-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
                    <p className="font-bold">{t('noDataTitle')}</p>
                    <p>{t('noDataBody')}</p>
                </div>
            )
        }
        
        if (query.trim() && filteredData.length > 0) {
            return (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredData.map(record => <ResultCard key={record.id} record={record} />)}
                </div>
            );
        }

        if (query.trim() && filteredData.length === 0) {
            return (
                <div className="text-center bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                    <p className="font-bold">{t('notFoundTitle')}</p>
                    <p>{t('notFoundBody', { query })}</p>
                </div>
            );
        }

        return (
            <div className="text-center text-white/80">
                <p>{t('searchPlaceholderHelper')}</p>
            </div>
        );
    }

    return (
        <div 
          className="relative py-16 md:py-24 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}
        >
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{t('title')}</h1>
                <p className="mt-4 text-lg text-brand-gold">{t('welcome')}</p>
            </div>
            
            <div className="mb-12">
              <LanguageSwitcher />
            </div>

            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t('searchPlaceholder')}
                        className="w-full pl-5 pr-14 py-4 text-lg bg-white/90 text-gray-800 rounded-full shadow-lg focus:ring-4 focus:ring-brand-gold/50 focus:outline-none transition-all"
                    />
                    <button type="submit" className="absolute inset-y-0 right-0 flex items-center justify-center w-14 h-full text-white bg-brand-red rounded-full hover:bg-brand-red/90 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-colors">
                        <Icon type="search" className="w-6 h-6" />
                    </button>
                </form>

                <div className="mt-12 min-h-[200px]">
                    {renderContent()}
                </div>
            </div>
          </div>
        </div>
    );
};

export default HomePage;
