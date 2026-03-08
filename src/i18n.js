// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Imports
import en from './locales/en';
import es from './locales/es';
import ca from './locales/ca';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        detection: {
            order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
            caches: ['localStorage']
        },
        resources: {
            en: { translation: en },
            es: { translation: es },
            ca: { translation: ca }
        },
    });