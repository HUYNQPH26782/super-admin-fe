import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './i18n/en';
import { vi } from './i18n/vi';
import { LANGUAGES } from './constants';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    supportedLngs: LANGUAGES.map(el => el.code),
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
  });

export default i18n;
