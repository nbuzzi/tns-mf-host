import { ITheme } from "../theme.model";

export interface TNSOCardProps extends ITheme {
  children: React.ReactNode;
  className?: string;
}
