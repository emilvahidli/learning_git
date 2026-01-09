import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Language = 'az' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [language, setLanguage] = useState<Language>('az');

  // Extract language from URL
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const langFromUrl = pathParts[pathParts.length - 1];
    if (langFromUrl === 'az' || langFromUrl === 'en') {
      setLanguage(langFromUrl);
    }
  }, [location.pathname]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
