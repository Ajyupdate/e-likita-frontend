"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  translations: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<any>({});

  const isRTL = language === 'ar';

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`@/locales/${language}/common.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English if loading fails
        if (language !== 'en') {
          const fallbackModule = await import(`@/locales/en/common.json`);
          setTranslations(fallbackModule.default);
        }
      }
    };

    loadTranslations();
  }, [language]);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('e-likita-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('e-likita-language', lang);
    
    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Set initial document direction
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const value = {
    language,
    setLanguage,
    isRTL,
    translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation hook
export function useTranslation() {
  const { translations } = useLanguage();
  
  const t = (key: string, fallback?: string) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return typeof value === 'string' ? value : fallback || key;
  };

  return { t };
}
