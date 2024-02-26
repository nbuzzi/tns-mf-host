import React, { ReactNode } from "react";

import { store } from "../../store/StoreMobx";
import { observer } from "mobx-react";

const LightTheme = React.lazy(() => import("./LightTheme"));
const DarkTheme = React.lazy(() => import("./DarkTheme"));
interface Props {
  children?: ReactNode;
}
const ThemeSelector: React.FC<Props> = ({ children }) => {
  const isDarkMode = store.customizer.isDark;

  return (
    <>
      {isDarkMode ? <DarkTheme /> : <LightTheme />}
      {children}
    </>
  );
};
export default observer(ThemeSelector);
