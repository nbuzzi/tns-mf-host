import { ITheme } from "../theme.model";

export interface TNSOSearchProps extends ITheme {
  themeSelected: "dark" | "light";
  keyFilter: string;
  onReset: () => void;
  onSearch: (value: string | number | boolean, keyFilter: string) => void;
}
