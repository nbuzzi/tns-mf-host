import { InputProps as AntdInputProps } from "antd";
import { ITheme } from "../theme.model";

export enum InputType {
  Password = "password",
  Text = "text",
  TextAres = "textarea"
}

export interface TNSOInputProps extends AntdInputProps, ITheme {
  type?: InputType;
}
