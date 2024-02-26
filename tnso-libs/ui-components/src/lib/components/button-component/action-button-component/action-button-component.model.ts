import { ITheme } from '../../theme.model';

interface TNSOActionButton {
  text?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
  onChange?: () => void;
}

export interface TNSOActionButtonProps extends ITheme {
  actionsButtons?: TNSOActionButton[];
}
