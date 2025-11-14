
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

// FIX: Replaced custom NavLink with standard react-router-dom NavLink for robustness and to fix type errors.
const getNavLinkClass = ({ isActive }: { isActive: boolean; }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-brand-gold' : 'text-white hover:text-brand-gold/80'}`;

export const Header: React.FC = () => {
    const { t } = useLanguage();
    return (
        <header className="bg-brand-red/90 text-white shadow-md backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold tracking-tight">
                            {t('schoolName')}<span className="text-brand-gold">{t('celebrationName')}</span>
                        </Link>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/" className={getNavLinkClass}>{t('navSearch')}</NavLink>
                            <NavLink to="/admin" className={getNavLinkClass}>{t('navAdmin')}</NavLink>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};
