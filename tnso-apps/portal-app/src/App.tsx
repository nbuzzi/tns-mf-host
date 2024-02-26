import React, { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Themeroutes from './routes/Router';
import ThemeSelector from './layouts/theme/ThemeSelector';
import Loader from './layouts/loader/Loader';
import { TokenHelper } from './helpers/token/TokenHelper';
import { useAsyncCall } from './hooks/useAsyncCallShared';

import { store } from './store/StoreMobx';
import { observer } from 'mobx-react';
import { AuthHelper } from './helpers/auth/AuthHelper';

export const App: React.FC = () => {
  const direction = store.customizer.isRTL;
  const isDark = store.customizer.isDark;
  const routing = useRoutes(Themeroutes);

  useEffect(() => {
    localStorage.setItem('queryParams', '');
    localStorage.setItem('lvcParams', '');
  }, []);

  const loader = useAsyncCall(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      await AuthHelper.getAuthByToken(accessToken);
      await TokenHelper.validateExpiredToken(accessToken, refreshToken);
    }
  }, []);

  return loader.completed ? (
    <Suspense fallback={<Loader />}>
      <div
        className={`${direction ? 'rtl' : 'ltr'} ${
          isDark ? 'dark-theme' : 'light-theme'
        }`}
        dir={direction ? 'rtl' : 'ltr'}
      >
        <ToastContainer theme={isDark ? 'dark' : 'light'} limit={1} />
        <ThemeSelector />
        {routing}
      </div>
    </Suspense>
  ) : null;
};

export default observer(App);
