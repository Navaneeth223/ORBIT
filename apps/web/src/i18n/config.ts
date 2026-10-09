import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import th from './locales/th.json';

const resources = {
  en: { translation: en },
  th: { translation: th },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  lng:
    localStorage.getItem('orbit-lang') ||
    navigator.language.split('-')[0] ||
    'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
    lookupLocalStorage: 'orbit-lang',
  },
});

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('orbit-lang', lng);
});

export default i18n;
