// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Imports
import enCommon from './locales/en/common.json';
import enInfo from './locales/en/info.json';
import enHistory from './locales/en/history.json';
import enNav from './locales/en/nav.json';
import enSettings from './locales/en/settings.json';
import esCommon from './locales/es/common.json';
import esInfo from './locales/es/info.json';
import esNav from './locales/es/nav.json';
import esHistory from './locales/es/history.json';
import esSettings from './locales/es/settings.json';
import caCommon from './locales/ca/common.json';
import caInfo from './locales/ca/info.json';
import caNav from './locales/ca/nav.json';
import caHistory from './locales/ca/history.json';
import caSettings from './locales/ca/settings.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    ...enCommon,
                    info: enInfo,
                    history: enHistory,
                    nav: enNav,
                    settings: enSettings,
                }
            },
            es: {
                translation: {
                    ...esCommon,
                    info: esInfo,
                    history: esHistory,
                    nav: esNav,
                    settings: esSettings
                }
            },
            ca: {
                translation: {
                    ...caCommon,
                    info: caInfo,
                    history: caHistory,
                    nav: caNav,
                    settings: caSettings
                }
            }
        },
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    });