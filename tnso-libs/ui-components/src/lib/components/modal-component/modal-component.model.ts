import { ModalProps, ButtonProps } from 'antd';
import { ITheme } from '../theme.model';

export interface TNSOModalProps extends ModalProps, ITheme {
  title?: React.ReactNode;
  open?: boolean;
  closeIcon?: boolean | React.ReactNode;
  textOkButton?: string;
  textCancelButton?: string;
  handleAccept?: () => void;
  handleCancel?: () => void;
}
