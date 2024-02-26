import { QueryParams } from "../shared/queryParams";

export interface Device {
  tnsDeviceName: string;
  customerDeviceName: string;
  connectivityStatus: string;
  operationalStatus: string;
  acna: string;
  knownAs: string;
  hasGeolocation: boolean;
  country: string;
}

export interface DeviceTable {
  tnsDeviceName: string;
  customerDeviceName: string;
  connectivityStatus: string;
  operationalStatus: OperationalStatus;
  acna: string;
  knownAs: string;
  hasGeolocation: string;
  country: string;
}

export interface DeviceDetail {
  tnsDeviceName: string;
  customerDeviceName: string;
  acna: string;
  knownAs: string;
  company: string;
  manufacturer: string;
  model: string;
  operationalStatus: string;
  connectivityStatus: ConnectivityStatus;
  lanIpAddress: string;
  lanSubnetMask: string;
  latitude: string;
  longitude: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  statusLastChangedOn: number;
}

export interface DeviceAddress {
  latitude: string;
  longitude: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
  countryCode: string;
}

export interface UpdateDeviceStatus {
  tnsName: string;
  connectivityStatus: ConnectivityStatus;
}

export interface ServiceStatus {
  onPrimary: number;
  offline: number;
  onBackup: number;
  unknown: number;
  indeterminate: number;
}

export interface DeviceParams extends QueryParams {
  acnas?: string;
  companyName?: string;
  connectivityStatus?: string;
  customerDeviceName?: string;
  countries?: string;
  operationalStatus?: string;
  service?: string;
  tnsDeviceName?: string;
}

export enum ConnectivityStatus {
  onPrimary = "onPrimary",
  onBackup = "onBackup",
  offline = "offline",
  indeterminate = "indeterminate",
  unknown = "unknown"
}

export enum OperationalStatus {
  Configured = "Configured",
  Operational = "Operational",
  Testing = "Testing",
  Installed = "Installed",
  CustomerHold = "CustomerHold",
  Shipped = "Shipped",
  Hold = "Hold",
  all = "all"
}

export enum DeviceStatus {
  ProductionDevices = "Production Devices",
  PreProductionDevices = "Pre-Production Devices"
}

export enum DeviceConfiguration {
  TNSService = "TNS Service",
  CPEMakeModel = "CPE Make/Model"
}
