"use client";
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'ar' as const, name: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
        className="h-9 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-2 text-sm appearance-none cursor-pointer pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  );
}
