import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import Themeroutes from './routes/router';
import Loader from './layouts/loader/loader';
import ThemeSelector from './layouts/theme/theme-selector';

export function App() {
  const routing = useRoutes(Themeroutes);

  return (
    <Suspense fallback={<Loader />}>
      <div className="ltr dark-theme ">
        <ThemeSelector />
        {routing}
      </div>
    </Suspense>
  );
}

export default App;
