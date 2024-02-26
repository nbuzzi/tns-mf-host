import * as theme from '../../../theme/theme';

export const dark = {
  components: {
    Dropdown:{
      colorBgElevated: theme.dark_body_bg_color,
      colorText: theme.dark_tnso_btn_text_secondary,
      colorPrimaryBorder: theme.dark_tnso_btn_border_secondary,
      controlItemBgHover: theme.dark_tnso_btn_bg_secondary_hover,
    },
    Checkbox: {
      colorBgContainer: theme.dark_body_bg_color,
      colorBorder: theme.dark_tnso_btn_border_primary,
      colorPrimary: theme.dark_tnso_btn_bg_primary,
      colorTextDisabled: theme.dark_tnso_input_text_disabled,
    },
    Input: {
      colorText: theme.dark_tnso_text_grid,
      colorBgContainer: theme.dark_body_bg_color,
      colorBorder: theme.dark_tnso_btn_border_primary,
      colorTextPlaceholder: theme.dark_tnso_text_grid,
      colorTextDisabled: theme.dark_tnso_input_text_disabled,
    },
    Transfer: {
      controlItemBgActive: theme.dark_tnso_select_border_active,
      controlItemBgActiveHover: theme.dark_tnso_hover_b_grid,
      colorBorder: theme.dark_tnso_btn_border_primary,
      colorText: theme.dark_tnso_text_grid,
      colorBgContainer: theme.dark_body_bg_color,
      controlItemBgHover: theme.dark_tnso_hover_b_grid,
      headerBorderRadius: theme.transfer_list_header_border_radius,
      colorTextDisabled: theme.dark_tnso_input_text_disabled,
    },
    Empty: {
      colorTextDisabled: theme.dark_tnso_text_grid,
    },
    Pagination: {
      colorText: theme.dark_tnso_text_grid,
      colorBgContainer: theme.dark_body_bg_color,
      colorBorder: theme.dark_tnso_btn_border_primary,
      colorTextPlaceholder: theme.dark_tnso_text_grid,
      colorTextDescription: theme.dark_tnso_text_grid,
      colorTextDisabled: theme.dark_tnso_input_text_disabled,
    },
    Button: {
      colorText: theme.dark_tnso_text_grid,
      colorBgContainer: theme.dark_body_bg_color,
      colorBorder: theme.dark_tnso_btn_border_primary,
      colorTextDisabled: theme.dark_tnso_text_grid,
      colorPrimary: theme.dark_tnso_btn_bg_primary,
    },
  },
};

export const light = {
  components: {
    Dropdown:{
      colorBgElevated: theme.light_body_bg_color,
      colorText: theme.light_tnso_btn_text_secondary,
      colorPrimaryBorder: theme.light_tnso_btn_border_secondary,
      controlItemBgHover: theme.light_tnso_btn_bg_secondary_hover,
    },
    Checkbox: {
      colorBgContainer: theme.light_body_bg_color,
      colorBorder: theme.light_tnso_btn_border_primary,
      colorTextDisabled: theme.light_tnso_input_text_disabled,
    },
    Input: {
      colorText: theme.light_tnso_text_grid,
      colorBgContainer: theme.light_body_bg_color,
      colorBorder: theme.light_tnso_btn_border_primary,
      colorTextPlaceholder: theme.light_tnso_text_grid,
      colorTextDescription: theme.light_tnso_text_grid,
      colorTextDisabled: theme.light_tnso_input_text_disabled,
    },
    Empty: {
      colorTextDisabled: theme.light_tnso_text_grid,
    },
    Transfer: {
      controlItemBgActive: theme.light_tnso_select_border_active,
      controlItemBgActiveHover: theme.light_tnso_hover_b_grid,
      colorBorder: theme.light_tnso_btn_border_primary,
      colorText: theme.light_tnso_text_grid,
      colorBgContainer: theme.light_body_bg_color,
      controlItemBgHover: theme.light_tnso_hover_b_grid,
      headerBorderRadius: theme.transfer_list_header_border_radius,
      colorTextDisabled: theme.light_tnso_input_text_disabled,
    },
    Pagination: {
      colorText: theme.light_tnso_text_grid,
      colorBgContainer: theme.light_body_bg_color,
      colorBorder: theme.light_tnso_btn_border_primary,
      colorTextPlaceholder: theme.light_tnso_text_grid,
      colorTextDescription: theme.light_tnso_text_grid,
      colorTextDisabled: theme.light_tnso_input_text_disabled,
    },
  },
};
