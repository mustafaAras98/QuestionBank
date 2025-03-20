import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import en from './src/locales/en/translation.json';
import tr from './src/locales/tr/translation.json';

const getLanguage = () => {
  const locales = getLocales();
  return locales[0].languageCode;
};

const resources = {
  en: en,
  tr: tr,
};

i18next.use(initReactI18next).init({
  resources,
  lng: getLanguage() ?? 'tr',
  supportedLngs: ['tr', 'en'],
  fallbackLng: 'tr',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export default i18next;
