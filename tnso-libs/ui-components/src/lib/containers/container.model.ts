import { ITheme } from "lib/components/theme.model";

export interface TNSOContainerProps extends ITheme {
  children: React.ReactNode;
  fluid?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
