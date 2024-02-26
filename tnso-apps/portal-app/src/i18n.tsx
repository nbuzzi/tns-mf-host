import i18n from 'i18next';
import translationsEn from './translations/Releases/4.2.0/en/English.json';
import translationsPt from './translations/Releases/4.2.0/pt/Portuguese.json';
import translationsEs from './translations/Releases/4.2.0/es/Spanish.json';
import validationsEn from './translations/Releases/4.2.0/en/validations.json';
import validationsPt from './translations/Releases/4.2.0/pt/validations.json';
import validationsEs from './translations/Releases/4.2.0/es/validations.json';
import { DateHelper } from './helpers/shared/DateHelper';
const instance = i18n.createInstance();
const locale = navigator.language;
DateHelper.initialize(locale);

instance.init({
  // otras configuraciones...
  fallbackLng: ['en', 'es', 'pt'],
  ns: ['translations', 'validations'],
  defaultNS: 'translations',
  resources: {
    en: {
      translations: translationsEn,
      validations: validationsEn,
    },
    pt: {
      translations: translationsPt,
      validations: validationsPt,
    },
    es: {
      translations: translationsEs,
      validations: validationsEs,
    },
  },
});

const i18nInstance = instance;
export { i18nInstance };

export default instance;
