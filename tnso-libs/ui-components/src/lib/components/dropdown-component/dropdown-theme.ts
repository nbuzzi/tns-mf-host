import * as theme from "../../../theme/theme";

export const dark ={
    components:{
        Dropdown:{
            colorBgElevated: theme.dark_tnso_btn_bg_secondary,
            colorText: theme.dark_tnso_btn_text_secondary,
            colorPrimaryBorder: theme.dark_tnso_btn_border_secondary,
            controlItemBgHover: theme.dark_tnso_btn_bg_secondary_hover,
        },
        Button:{
            defaultBg: theme.dark_secondary_color_transparent,
            defaultColor: theme.dark_tnso_btn_text_outline_primary,
            defaultBorderColor: theme.dark_tnso_btn_border_secondary,
            borderRadius: theme.dropdown_border_radius,
            controlHeight: theme.dropdown_control_height,
            colorTextDisabled: theme.dark_tnso_btn_text_secondary_disabled,
            colorBgContainerDisabled: theme.dark_tnso_btn_bg_secondary_disabled,
            borderColorDisabled: theme.dark_tnso_btn_border_secondary_disabled,
            
        }
    }
}

export const light ={
    components:{
        Dropdown:{
            colorBgElevated: theme.light_tnso_btn_bg_secondary,
            colorText: theme.light_tnso_btn_text_secondary,
            colorPrimaryBorder: theme.light_tnso_btn_border_secondary,
            controlItemBgHover: theme.light_tnso_btn_bg_secondary_hover,
        },
        Button:{
            defaultBg: theme.light_secondary_color_transparent,
            defaultColor: theme.light_tnso_btn_text_outline_primary,
            defaultBorderColor: theme.light_tnso_btn_border_secondary,
            borderRadius: theme.dropdown_border_radius,
            controlHeight: theme.dropdown_control_height,
            colorTextDisabled: theme.light_tnso_btn_text_secondary_disabled,
            colorBgContainerDisabled: theme.light_tnso_btn_bg_secondary_disabled,
            borderColorDisabled: theme.light_tnso_btn_border_secondary_disabled,
        }
    }
}