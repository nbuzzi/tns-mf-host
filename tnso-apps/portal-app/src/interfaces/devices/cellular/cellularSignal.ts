export interface CellularSignal {
  name: string;
  dateTime: string;
  technologyType: TechnologyType;
  normLow: number;
  normHigh: number;
  normAverage: number;
  rssiAverage: number;
  rsrpAverage: number;
  rsrqAverage: number;
  rscpAverage: number;
  ecioAverage: number;
  sinrAverage: number;
  rsrpCount: number;
  rsrqCount: number;
  rscpCount: number;
  ecioCount: number;
  sinrCount: number;
  normSignalQuality: SignalQualityType;
  rssiSignalQuality: SignalQualityType;
  rsrpSignalQuality: SignalQualityType;
  rsrqSignalQuality: SignalQualityType;
  rscpSignalQuality: SignalQualityType;
  ecioSignalQuality: SignalQualityType;
  sinrSignalQuality: SignalQualityType;
  modelName: string;
  service: ServiceType;
}

export interface CellularSignalExport {
  "TNS Device Name": string;
  "Date Time": string;
  "Technology Type": TechnologyType;
  "Norm Low": number;
  "Norm High": number;
  "Norm Average": number;
  "RSSI Average": number;
  "RSRP Average": number;
  "RSRQ Average": number;
  "RSCP Average": number;
  "EC/IO Average": number;
  "SINR Average": number;
  "RSRP Count": number;
  "RSRQ Count": number;
  "RSCP Count": number;
  "EC/IO Count": number;
  "SINR Count": number;
  "Norm Signal Quality": SignalQualityType;
  "RSSI Signal Quality": SignalQualityType;
  "RSRP Signal Quality": SignalQualityType;
  "RSRQ Signal Quality": SignalQualityType;
  "RSCP Signal Quality": SignalQualityType;
  "EC/IO Signal Quality": SignalQualityType;
  "SINR Signal Quality": SignalQualityType;
  "Model Name": string;
  Service: ServiceType;
}

export enum TechnologyType {
  "4G" = "4G",
  "3G" = "3G",
  "2G" = "2G"
}

export enum SignalQualityType {
  Excellent = "Excellent",
  Good = "Good",
  Fair = "Fair",
  Poor = "Poor",
  NoSignal = "No Signal"
}

export enum ServiceType {
  LTE = "lte"
}

export enum Period {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly"
}

export interface RawTNSSignalStates {
  current: RawData;
  daily: RawData;
  weekly: RawData;
  monthly: RawData;
}

export interface TNSSignalStates {
  current: DataSeries[];
  daily: DataSeries[];
  weekly: DataSeries[];
  monthly: DataSeries[];
}

export interface RawData {
  time: string[];
  data: DataTable[];
}

export interface DataSeries {
  name: string;
  data: (number | null)[];
}

export interface DataTable {
  technology: string;
  data: SignalDataTable[];
}

export interface SignalDataTable {
  signalIndicator: string;
  signal: (string | number)[];
}

export interface SignalStrength {
  tnsDeviceName: string;
  dateTime: string;
  high: number;
  low: number;
}
