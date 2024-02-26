import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';

const DarkTheme = React.lazy(() => import('./dark-theme'));
interface Props {
  children?: ReactNode;
}
const ThemeSelector: React.FC<Props> = ({ children }) => {
  return (
    <>
      {<DarkTheme />}
      {children}
    </>
  );
};
export default observer(ThemeSelector);
