import { env } from '../../../../env';

export const API_URL_BASE = env.VITE_API_URL_BASE || '';
export const API_URL_BASE_V2 = '';
export const API_SOCKET_URL = '';
export const GOOGLE_API_KEY = env.VITE_GOOGLE_API_KEY || '';
export const JWT_SECRET = env.VITE_JWT_SECRET || '';

// These flags enable or disable the content view of each device details tabs
export const DETAILS_ENABLED = env.VITE_DETAILS_ENABLED;
export const CELLULAR_USAGE_ENABLED = env.VITE_CELLULAR_USAGE_ENABLED;
export const CELLULAR_SIGNAL_ENABLED = env.VITE_CELLULAR_SIGNAL_ENABLED;
export const MEMBERS_ENABLED = env.VITE_MEMBERS_ENABLED;
export const UPTIME_ENABLED = env.VITE_UPTIME_ENABLED;
export const LVC_ENABLED = env.VITE_LVC_ENABLED;
export const NOTES_ENABLED = env.VITE_NOTES_ENABLED;
export const SOFTWARE_ENABLED = false;
export const USAGE_ENABLED = false;

// These flags enable or disable the switch to change the theme
export const SWITCH_ENABLE = env.VITE_SWITCH_CHANGE_THEME_ENABLED;

// These flags activate or deactivate the LAN component.
export const LAN_ENABLE = env.VITE_LAN_COMPONENT_ACTIVATED;

// These flags enable or disable the menu options
export const MENU_MONITORING_ENABLED = env.VITE_MENU_MONITORING_ENABLED;
export const MENU_MONITORING_DEVICES_ENABLED =
  env.VITE_MENU_MONITORING_DEVICES_ENABLED;
export const MENU_ADMINISTRATION_ENABLED =
  env.VITE_MENU_ADMINISTRATION_ENABLED;
export const MENU_ADMINISTRATION_COMPANY_ENABLED =
  env.VITE_MENU_ADMINISTRATION_COMPANY_ENABLED;
export const MENU_ADMINISTRATION_USER_ENABLED =
  env.VITE_MENU_ADMINISTRATION_USER_ENABLED;
export const MENU_SUPPORT_INCIDENTS_ENABLED =
  env.VITE_MENU_SUPPORT_INCIDENTS_ENABLED;

// These flags enable or disable the specific features in the site
export const FILTERS_IN_MENU_TREE = env.VITE_FILTERS_IN_MENU_TREE;
