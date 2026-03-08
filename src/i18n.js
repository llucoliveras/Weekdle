// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Imports
import enCommon from './locales/en/common.json';
import enInfo from './locales/en/info.json';
import enHistory from './locales/en/history.json';
import enHome from './locales/en/home.json';
import enNav from './locales/en/nav.json';
import enSettings from './locales/en/settings.json';
import esCommon from './locales/es/common.json';
import esInfo from './locales/es/info.json';
import esNav from './locales/es/nav.json';
import esHistory from './locales/es/history.json';
import esHome from './locales/es/home.json';
import esSettings from './locales/es/settings.json';
import caCommon from './locales/ca/common.json';
import caInfo from './locales/ca/info.json';
import caNav from './locales/ca/nav.json';
import caHistory from './locales/ca/history.json';
import caHome from './locales/ca/home.json';
import caSettings from './locales/ca/settings.json';

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
            en: {
                translation: {
                    ...enCommon,
                    info: enInfo,
                    history: enHistory,
                    home: enHome,
                    nav: enNav,
                    settings: enSettings
                }
            },
            es: {
                translation: {
                    ...esCommon,
                    info: esInfo,
                    history: esHistory,
                    home: esHome,
                    nav: esNav,
                    settings: esSettings
                }
            },
            ca: {
                translation: {
                    ...caCommon,
                    info: caInfo,
                    history: caHistory,
                    home: caHome,
                    nav: caNav,
                    settings: caSettings
                }
            }
        },
    });