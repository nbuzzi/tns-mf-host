export const env = {
  VITE_PORTAL_ENVIRONMENT: 'development',
  VITE_API_URL_BASE: 'https://tns-backend.vercel.app/v1/portalapi',
  VITE_JWT_SECRET: 'tns-dashboard',
  // VITE_API_URL_BASE:'http://172.17.8.145/v1/portalapi',
  VITE_GOOGLE_API_KEY: 'AIzaSyAGOYRSpWgUwGpvOeRS6ltEY4oADP59Srw',
  VITE_PORTAL_IP_HOST: '127.0.0.1',
  VITE_PORTAL_PORT_HOST: 8080,
  VITE_PORTAL_IP_REMOTE: '127.0.0.1',
  VITE_ADMINISTRATION_PORT_REMOTE: "https://tns-administration-app.vercel.app/",
  VITE_PORTAL_PORT_REMOTE: "https://tns-portal-app.vercel.app/",
  VITE_I18N_PORT_REMOTE: "https://tns-i18n-module.vercel.app/",

  // ---------------------------------------------------------- Administration App
  VITE_DEVICES_ENABLED: true,
  VITE_CONTACTS_ENABLED: true,

  // ---------------------------------------------------------- Strapi App
  VITE_API_URL_STRAPI: 'http:#localhost:1337',

  //---------------------------------------------------------- Portal App
  // These flags enable or disable the content view of each device details tabs
  VITE_DETAILS_ENABLED: true,
  VITE_CELLULAR_USAGE_ENABLED: true,
  VITE_CELLULAR_SIGNAL_ENABLED: true,
  VITE_UPTIME_ENABLED: true,
  VITE_LVC_ENABLED: true,
  VITE_NOTES_ENABLED: true,
  VITE_MEMBERS_ENABLED: true,
  // These flags enable or disable the switch to change the theme
  VITE_SWITCH_CHANGE_THEME_ENABLED: false,
  // These flags activate or deactivate the LAN component.
  VITE_LAN_COMPONENT_ACTIVATED: false,
  // These flags enable or disable the menu options
  VITE_MENU_MONITORING_ENABLED: true,
  VITE_MENU_MONITORING_DEVICES_ENABLED: true,
  VITE_MENU_ADMINISTRATION_ENABLED: true,
  VITE_MENU_ADMINISTRATION_COMPANY_ENABLED: true,
  VITE_MENU_ADMINISTRATION_USER_ENABLED: true,
  VITE_MENU_SUPPORT_INCIDENTS_ENABLED: false,
  // These flags enable or disable the filters in the menu
  VITE_FILTERS_IN_MENU_TREE: false,
};
