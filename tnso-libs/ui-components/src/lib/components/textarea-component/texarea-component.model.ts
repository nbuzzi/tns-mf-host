import { TextAreaProps } from "antd/es/input";
import { ITheme } from "../theme.model";

export interface TNSOTextareaProps extends TextAreaProps, ITheme {
  themeSelected?: string;
}
