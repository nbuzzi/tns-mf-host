import {
  MENU_MONITORING_DEVICES_ENABLED,
  MENU_MONITORING_ENABLED,
  MENU_ADMINISTRATION_ENABLED,
  MENU_ADMINISTRATION_COMPANY_ENABLED,
  MENU_ADMINISTRATION_USER_ENABLED,
  MENU_SUPPORT_INCIDENTS_ENABLED
} from "../environments";

export interface MenuEnabled {
  monitoring: boolean;
  devices: boolean;
  transactions: boolean;
  support: boolean;
  incidentManagement: boolean;
  changeManagement: boolean;
  userManagement: boolean;
  userAdministration: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MENU_ENABLED: any = {
  monitoring: MENU_MONITORING_ENABLED ? true : false,
  devices: MENU_MONITORING_DEVICES_ENABLED ? true : false,
  administration: MENU_ADMINISTRATION_ENABLED ? true : false,
  companyAdministration: MENU_ADMINISTRATION_COMPANY_ENABLED ? true : false,
  userAdministration: MENU_ADMINISTRATION_USER_ENABLED ? true : false,
  incidentManagement: MENU_SUPPORT_INCIDENTS_ENABLED ? true : false
};
