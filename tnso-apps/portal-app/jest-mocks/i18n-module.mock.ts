import i18next from 'i18next';
const Text = (text: string) => {
  i18next.changeLanguage('en');
  return i18next.t(text);
};

export default Text;
