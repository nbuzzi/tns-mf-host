import type { NotificationArgsProps } from 'antd';
import { ITheme } from '../theme.model';

type NotificationPlacement = NotificationArgsProps['placement'];

export interface ITNSONotificationProps extends ITheme{
  type?: NotificationTypes;
  title?: string;
  description?: string;
  duration?: number;
  placement?: NotificationPlacement;
}

export enum NotificationTypes {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}
