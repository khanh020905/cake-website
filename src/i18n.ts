import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLocales from './locales/en.json';
import frLocales from './locales/fr.json';

const resources = {
  en: {
    translation: enLocales,
  },
  fr: {
    translation: frLocales,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Set default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safeguards from XSS
    },
  });

export default i18n;
