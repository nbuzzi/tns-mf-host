import { SelectProps } from "antd";
import { ITheme } from "../theme.model";

export interface TNSOSelectorProps extends SelectProps, ITheme {
  themeSelected?: string;
}
