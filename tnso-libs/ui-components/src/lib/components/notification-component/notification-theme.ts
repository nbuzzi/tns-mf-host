import * as theme from '../../../theme/theme';

export const success = {
  components: {
    Notification: {
      colorBgElevated: theme.dark_tnso_toast_bg_success,
      colorText: theme.dark_tnso_toast_text_success,
      colorTextHeading: theme.dark_tnso_toast_text_success,
      colorIcon: theme.dark_tnso_toast_bg_success,
      colorSuccess: theme.dark_tnso_toast_icon_success,
    },
  },
};

export const error = {
  components: {
    Notification: {
      colorBgElevated: theme.dark_tnso_toast_bg_error,
      colorText: theme.dark_tnso_toast_text_error,
      colorTextHeading: theme.dark_tnso_toast_text_error,
      colorIcon: theme.dark_tnso_toast_bg_error,
      colorError: theme.dark_tnso_toast_icon_error,
    },
  },
};
