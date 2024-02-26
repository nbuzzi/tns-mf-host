import { makeAutoObservable } from "mobx";
import { MenuKeys } from "../../layouts/sidebars/vertical/Sidebar";

export const enum Language {
  en = "en",
  es = "es",
  pt = "pt",
  fr = "fr",
  de = "de",
  it = "it",
  nl = "nl",
  ph = "ph"
}
export interface IShared {
  menuItemSelected?: MenuKeys | string;
  openKeys: MenuKeys[];
  inlineCollapsed: boolean;
  currentLanguage: string;
  setMenuItemSelected: (menuItem?: MenuKeys) => void;
  setInlineCollapsed: (inlineCollapsed: boolean) => void;
  setLanguage: (language: string) => void;
  setOpenKeys: (openKeys: MenuKeys[]) => void;
}
class Shared implements IShared {
  menuItemSelected?: MenuKeys | string;
  openKeys: MenuKeys[] = [];
  inlineCollapsed = false;
  currentLanguage = localStorage.getItem("language") || Language.en;

  constructor() {
    makeAutoObservable(this);
    this.menuItemSelected = localStorage.getItem("menuItemSelected") as MenuKeys;
    this.openKeys = JSON.parse(localStorage.getItem("openKeys") || "[]");
  }

  setLanguage = (language: string): void => {
    localStorage.setItem("language", language);
    this.currentLanguage = language;
  };

  setMenuItemSelected = (menuItem?: MenuKeys): void => {
    if (!menuItem) {
      this.menuItemSelected = undefined;
      this.inlineCollapsed = true;
      localStorage.removeItem("menuItemSelected");
      return;
    }
    localStorage.setItem("menuItemSelected", menuItem.toString());
    this.menuItemSelected = menuItem;
  };

  setInlineCollapsed = (inlineCollapsed: boolean): void => {
    this.inlineCollapsed = inlineCollapsed;
  };

  setOpenKeys = (openKeys: MenuKeys[]): void => {
    this.openKeys = openKeys;
    localStorage.setItem("openKeys", JSON.stringify(openKeys));
  };
}
const shared = new Shared();
export default shared;
