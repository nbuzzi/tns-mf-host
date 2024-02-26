import i18n from 'i18next';
import translationsEn from './Releases/4.2.0/en/English.json';
import translationsPt from './Releases/4.2.0/pt/Portuguese.json';
import translationsEs from './Releases/4.2.0/es/Spanish.json';
import translationsFr from './Releases/4.2.0/fr/French.json';
import translationsIt from './Releases/4.2.0/it/Italian.json';
import translationsDe from './Releases/4.2.0/de/German.json';
import translationsPh from './Releases/4.2.0/ph/Filipino.json';
import translationsNl from './Releases/4.2.0/nl/Dutch.json';
import validationsEn from './Releases/4.2.0/en/validations.json';
import validationsPt from './Releases/4.2.0/pt/validations.json';
import validationsEs from './Releases/4.2.0/es/validations.json';
import validationsFr from './Releases/4.2.0/fr/validations.json';
import validationsIt from './Releases/4.2.0/it/validations.json';
import validationsDe from './Releases/4.2.0/de/validations.json';
import validationsPh from './Releases/4.2.0/ph/validations.json';
import validationsNl from './Releases/4.2.0/nl/validations.json';
import { DateHelper } from '../helpers/DateHelper';
const instance = i18n.createInstance();
const locale = navigator.language;
DateHelper.initialize(locale);

instance.init({
  interpolation: {
    // React already does escaping
    escapeValue: false,
  },
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
    fr: {
      translations: translationsFr,
      validations: validationsFr,
    },
    it: {
      translations: translationsIt,
      validations: validationsIt,
    },
    de: {
      translations: translationsDe,
      validations: validationsDe,
    },
    ph: {
      translations: translationsPh,
      validations: validationsPh,
    },
    nl: {
      translations: translationsNl,
      validations: validationsNl,
    },
  },
});

const i18nInstance = instance;
export { i18nInstance };

export default instance;
