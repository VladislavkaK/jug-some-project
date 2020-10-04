import i18next from 'i18next';
import { initReactI18next } from "react-i18next";

import enLocale from './en';
import ruLocale from './ru';

export const configLocale = function(lang: string): void {

  lang = lang.toLowerCase();

  i18next.use(initReactI18next);
  i18next.init({ 
    lng: lang,
    react: {
        useSuspense: false
    },
    resources: {
      en: { translation: enLocale },
      ru: { translation: ruLocale }
    },
  });
}