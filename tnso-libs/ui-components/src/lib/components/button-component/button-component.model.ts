import { ButtonProps } from "antd";
import { ITheme } from "../theme.model";

export const enum Variants {
  Primary = "primary",
  Secondary = "default",
  OutlinePrimary = "text",
  OutlineSecondary = "dashed",
  Link = "link"
}

export interface TNSOButtonProps extends ITheme, ButtonProps {
  variant?: Variants;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
  onChange?: () => void;
  isLoading?: boolean;
  options?: { label: string; onClick: () => void }[];
}
