import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { TRANSLATION_RU } from './ru/translation';
import { TRANSLATION_EN } from './en/translation';

i18n.use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources: {
            ru: {
                translation: TRANSLATION_RU,
            },
            en: {
                translation: TRANSLATION_EN,
            },
        },
        debug: true,
    });

export default i18n;