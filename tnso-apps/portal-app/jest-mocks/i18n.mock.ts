import { changeLanguage } from 'i18next';

const i18n = () => {
  return {
    changeLanguage: changeLanguage,
    t: (key: string) => key,
  };
};

export default i18n;
