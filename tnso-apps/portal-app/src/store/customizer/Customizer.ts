import { makeAutoObservable } from "mobx";

export interface ICustomizer {
  isDark: boolean;
  isMiniSidebar: boolean;
  isMobileSidebar: boolean;
  isTopbarFixed: boolean;
  isRTL: boolean;
  isTreeMenuMobile: boolean;

  ChangeDarkMode: (isDark: boolean) => void;
  ToggleMiniSidebar: () => void;
  ToggleMobileSidebar: () => void;
}

class Customizer implements ICustomizer {
  isDark = true;
  isMiniSidebar = false;
  isMobileSidebar = false;
  isTopbarFixed = true;
  isRTL = false;
  isTreeMenuMobile = false;

  constructor() {
    makeAutoObservable(this);
  }

  ChangeDarkMode = (isDark: boolean): void => {
    this.isDark = isDark;
  };

  ToggleMiniSidebar = (): void => {
    this.isMiniSidebar = !this.isMiniSidebar;
  };

  ToggleMobileSidebar = (): void => {
    this.isMobileSidebar = !this.isMobileSidebar;
  };
}

const customizer = new Customizer();

export default customizer;