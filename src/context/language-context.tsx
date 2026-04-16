"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type Locale, type TranslationKeys, translations } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (section: keyof TranslationKeys, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = useCallback(
    (section: keyof TranslationKeys, key: string): string => {
      const sectionObj = translations[locale]?.[section];
      if (sectionObj && key in sectionObj) {
        return (sectionObj as Record<string, string>)[key];
      }
      const fallback = translations.en[section];
      if (fallback && key in fallback) {
        return (fallback as Record<string, string>)[key];
      }
      return key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
