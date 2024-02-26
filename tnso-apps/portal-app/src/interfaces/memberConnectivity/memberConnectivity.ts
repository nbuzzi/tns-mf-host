import { QueryParams } from "../shared/queryParams";
import i18n from "../../i18n";
import { TRANSLATION } from "../../utils/const/translation";

export interface MembersResponse {
  totalRecords: number;
  returnedRecords: number;
  members: Member[];
}

export interface Member {
  acna: string;
  knownAs: string;
  memberConnectivityStatus: MemberConnectivityStatus;
  devices: DeviceMember[];
}
export enum InterfaceType {
  Primary_Site_To_Site = "Primary Site-to-Site",
  Secondary_Site_To_Site = "Secondary Site-to-Site"
}

export enum MemberConnectivityStatus {
  UP_FULL_SITE_TO_SITE = "Up-Full Site-to-Site",
  UP_SITE_TO_SITE = "Up Site-to-Site",
  UP_TNS_NETWORK = "Up TNS Network",
  DOWN = "Down"
}

export enum MembersTableTitle {
  SourceSite = "sourceSite",
  DestinationSite = "destinationSite",
  Wan = "wan",
  SiteToSite = "siteToSite"
}

export enum AcnaStatus {
  fullService = "fullService",
  onBackup = "onBackup",
  offline = "offline"
}

export enum InterfaceStatus {
  UP = "UP",
  DOWN = "DOWN"
}

export interface MembersExportResponse {
  totalRecords: number;
  returnedRecords: number;
  members: ExportMember[];
}

export interface ExportMember {
  acna: string;
  knownAs: string;
  destMembers: DestMember[];
}

export interface DeviceMember {
  srcTnsDeviceName: string;
  srcCustomerDeviceName: string;
  destTnsDeviceName: string;
  destCustomerDeviceName: string;
  interfaceDetails: InterfaceDetails[];
}

export interface InterfaceDetails {
  interfaceType: InterfaceType;
  interfaceStatus: InterfaceStatus;
}

export interface DestMember {
  memberConnectivityStatus: string;
  srcAndDestDevicesDetails: ExportMembersDetails[];
}

export interface ExportMembersDetails {
  srcTnsDeviceName: string;
  srcCustomerDeviceName: string;
  destAcna: string;
  destKnownAs: string;
  destTnsDeviceName: string;
  destCustomerDeviceName: string;
  interfaceDetails: InterfaceDetails[];
}

export interface MembersGraphResponse {
  srcAcna: string;
  srcKnownAs: string;
  srcAcnaStatus: AcnaStatus;
  connectedMembers: ConnectedMember[];
}

export interface ConnectedMember {
  destAcna: string;
  destKnownAs: string;
  destAcnaStatus: AcnaStatus;
  memberConnectivityStatus: MemberConnectivityStatus;
}

export interface MemberConnectivityParams extends QueryParams {
  acna?: string;
}

export interface MemberConnectivityDeviceName extends QueryParams {
  tnsDeviceName?: string;
}

export interface HasMemberConnectivity {
  hasMemberConnectivity: boolean;
  connectedAcnas: ConnectedAcna[];
}

export interface HasMemberDevice {
  hasMemberConnectivity: boolean;
}

export interface ConnectedAcna {
  acna: string;
  knownAs: string;
}

export interface ExportMemberTable {
  [key: string]: string;
}

export interface MemberHelper {
  ACNA: string;
  "Knows As": string;
  "Member Connectivity Status": string;
  "Source Device Name": string;
  "Source Customer Device Name": string;
  "Dest TNS Device Name": string;
  "Dest Customer Device Name": string;
  "WAN Instance": string;
  "Tunnel Status": string;
}

export interface MemberHelper {
  ACNA: string;
  "Knows As": string;
  "Member Connectivity Status": string;
  "Source Device Name": string;
  "Source Customer Device Name": string;
  "Dest TNS Device Name": string;
  "Dest Customer Device Name": string;
  "WAN Instance": string;
  "Tunnel Status": string;
}
export const membersTableTitlesTranslation = (title: MembersTableTitle): string => {
  return i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.TABLE[title]);
};
export const interfaceStatusTranslation = (interfacesStatus: InterfaceStatus): string => {
  return i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.INTERFACES[interfacesStatus]);
};
export const memberConnectivityTranslation = (option: MemberConnectivityStatus): string => {
  switch (option) {
    case "Down":
      return i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MEMBERSCONNECTIVITY.down);
    case "Up-Full Site-to-Site":
      return i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MEMBERSCONNECTIVITY.upFull);
    case "Up Site-to-Site":
      return i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MEMBERSCONNECTIVITY.upSiteToSite);
    case "Up TNS Network":
      return i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MEMBERSCONNECTIVITY.upTnsNetwork);
  }
  return "";
};

export const interfaceType = (instance: InterfaceType): string => {
  switch (instance) {
    case "Primary Site-to-Site":
      return i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.INTERFACETYPE.primary);
    case "Secondary Site-to-Site":
      return i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.INTERFACETYPE.secondary);
  }
  return "";
};
