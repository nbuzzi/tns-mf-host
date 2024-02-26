import { StrictMode, useState } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import i18n from './translations/i18n';
import { I18nextProvider } from 'react-i18next';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Root() {
  const [currentLanguage, setCurrentLanguage] = useState('es');

  const changeLanguage = (en: string) => {
    console.log('Changing language to:', en);
    i18n.changeLanguage(en);
    setCurrentLanguage(en);
    console.log('Current language:', currentLanguage);
  };

  return (
    <StrictMode>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Spanish</button>
      <I18nextProvider i18n={i18n}>
        <App text="hello" />
      </I18nextProvider>
    </StrictMode>
  );
}

root.render(<Root />);
