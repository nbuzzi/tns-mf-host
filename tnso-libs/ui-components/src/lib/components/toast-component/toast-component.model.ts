import { ITheme } from "../theme.model";

export const enum ToastTypes {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info"
}

export interface TNSOToastProps extends ITheme {
  type: ToastTypes | "success" | "error" | "warning" | "info";
  children: string;
  isShowIcon: boolean;
  isClosable: boolean;
}
