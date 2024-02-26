import * as theme from "../../../theme/theme";

export const dark = {
  components: {
    Table: {
      headerBg: theme.dark_tnso_bg_h_grid,
      headerColor: theme.dark_tnso_text_grid,
      colorText: theme.dark_tnso_text_grid,
      colorBgContainer: theme.dark_tnso_bg_b_grid,
      rowHoverBg: theme.dark_tnso_hover_b_grid,
      colorIcon: theme.dark_tnso_text_grid,
      colorIconHover: theme.dark_tnso_btn_bg_primary_hover,
      headerBorderRadius: theme.grid_header_border_radius
    },
  }
};

export const light = {
  components: {
    Table: {
      headerBg: theme.light_tnso_bg_h_grid,
      headerColor: theme.light_tnso_text_grid,
      colorText: theme.light_tnso_text_grid,
      colorBgContainer: theme.light_tnso_bg_b_grid,
      rowHoverBg: theme.light_tnso_hover_b_grid,
      colorIcon: theme.light_tnso_text_grid,
      colorIconHover: theme.light_tnso_btn_bg_primary_hover,
      headerBorderRadius: theme.grid_header_border_radius
    },
  }
};
