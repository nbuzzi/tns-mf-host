import { notification } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification/interface';
import './notification-component.scss';

export class TNSONotification {
  public static success(
    message: string,
    description?: string,
    duration?: number,
    placement?: NotificationPlacement
  ) {
    return notification.success({
      message: message,
      description: description,
      duration: duration,
      placement: placement,
      closeIcon: <div />,
    });
  }

  public static error(
    message: string,
    description?: string,
    duration?: number,
    placement?: NotificationPlacement
  ) {
    return notification.error({
      message: message,
      description: description,
      duration: duration,
      placement: placement ?? 'topRight',
      closeIcon: <div />,
    });
  }
}
