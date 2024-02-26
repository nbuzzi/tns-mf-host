import * as theme from "../../../theme/theme";

export const dark={
    components:{
        Pagination:{
            itemBg: theme.dark_tnso_pagination_bg,
            itemActiveBg: theme.dark_tnso_pagination_bg,
            colorText: theme.dark_tnso_pagination_text,
            colorTextDisabled: theme.dark_tnso_pagination_text,
            fontSize: theme.pagination_font_size,
        }
    }
}

export const light={
    components:{
        Pagination:{
            fontSize: theme.pagination_font_size,
            itemBg: theme.light_tnso_pagination_bg,
            itemActiveBg: theme.light_tnso_pagination_bg,
            colorText: theme.light_tnso_pagination_text,
            colorTextDisabled: theme.light_tnso_pagination_text,
        }
    }

}