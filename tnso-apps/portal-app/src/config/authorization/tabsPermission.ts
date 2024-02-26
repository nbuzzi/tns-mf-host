import {
  CELLULAR_SIGNAL_ENABLED,
  CELLULAR_USAGE_ENABLED,
  DETAILS_ENABLED,
  LVC_ENABLED,
  MEMBERS_ENABLED,
  NOTES_ENABLED,
  UPTIME_ENABLED,
  USAGE_ENABLED,
  SOFTWARE_ENABLED
} from "../environments";

// These flags enable or disable the content view of each device details tabs
export const TABS_ENABLED = {
  details: DETAILS_ENABLED,
  cellularSignal: CELLULAR_SIGNAL_ENABLED,
  cellularUsage: CELLULAR_USAGE_ENABLED,
  uptime: UPTIME_ENABLED,
  lvc: LVC_ENABLED,
  members: MEMBERS_ENABLED,
  notes: NOTES_ENABLED,
  software: SOFTWARE_ENABLED,
  usage: USAGE_ENABLED,
  exportAllMembers: MEMBERS_ENABLED,
  membersConnectivity: MEMBERS_ENABLED
};
