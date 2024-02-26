import { ConnectivityStatus, Device } from "../devices";
import { DataReport, Day, DeviceSignal, HistoricalUsage, Month } from "../chart/chart";
import { LVCData } from "../lvc/lvc";

// DEVICE
export interface DevicesResponse {
  totalRecords: number | undefined;
  returnedRecords: number | undefined;
  devices: Device[] | undefined;
}

// LVC
export interface LVCResponse {
  totalRecords: number | undefined;
  returnedRecords: number | undefined;
  lvcs: LVCData[] | undefined;
}

// UPTIME
export interface UptimeResponse {
  totalRecords: number | undefined;
  returnedRecords: number | undefined;
  historical: Day[] | Month[] | undefined;
}

// USAGE
export interface UsageResponse {
  totalRecords: number | undefined;
  returnedRecords: number | undefined;
  historical: HistoricalUsage[] | undefined;
}

// SIGNAL
export interface SignalResponse {
  totalRecords: number;
  displayRecords: number;
  historical: DeviceSignal[] | undefined;
}

export interface DataResponse {
  totalRecords: number | undefined;
  returnedRecords: number | undefined;
  dataReport: DataReport[] | undefined;
}

export interface GeolocationResponse {
  tnsDeviceName: string;
  acna?: string;
  connectivityStatus: ConnectivityStatus;
  latitude: string;
  longitude: string;
}

export interface CompanyResponse {
  totalRecords: number | undefined;
  returnedRecords: number | undefined;
  companyProfileName: string | undefined;
}
