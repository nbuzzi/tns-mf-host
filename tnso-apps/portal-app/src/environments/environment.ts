// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  VITE_GOOGLE_API_KEY: 'AIzaSyAGOYRSpWgUwGpvOeRS6ltEY4oADP59Srw',
  VITE_API_SOCKET_URL: 'ws://localhost:5000',
  VITE_JWT_SECRET: 'tns-dashboard',
  // VITE_API_URL_BASE: 'http://172.17.8.145/v1/portalapi',
  VITE_API_URL_BASE: 'http://localhost:5000/v1/portalapi',

  // URL API BACKEND
  //VITE_API_URL_BASE= 'http://172.21.240.38:8080/v1/portalapi',

  // URL API STRAPI
  VITE_API_URL_STRAPI: 'http://localhost:1337',

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

  // These flags enable or disable the specific features in the site
  VITE_FILTERS_IN_MENU_TREE: false,
};
