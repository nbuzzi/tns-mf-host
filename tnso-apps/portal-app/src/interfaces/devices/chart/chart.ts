import { SignalQualityType } from "../cellular/cellularSignal";

export interface Day {
  tnsDeviceName: string;
  day: string;
  month: string;
  year: string;
  uptime: number;
}

export enum Months {
  January = "january",
  February = "february",
  March = "march",
  April = "april",
  May = "may",
  June = "june",
  July = "july",
  August = "august",
  September = "september",
  October = "october",
  November = "november",
  December = "december"
}
export interface Month {
  tnsDeviceName: string;
  month: Months;
  year: string;
  uptime: number;
}

export interface DeviceSignal {
  tnsName: string;
  model: string;
  timestamp: string;
  hour: string;
  dayName: string;
  high: number;
  low: number;
  updateTime: string;
  service: string;
}

export interface MostRecentSignal {
  technology?: string;
  current: number;
}

export interface TNSSignal {
  technology: string;
  type: TypeSignal;
  current: number;
}

export interface TNSSignalResponse {
  hours: TNSSignal[];
  week: TNSSignal[];
  month: TNSSignal[];
}

export enum TypeSignal {
  RSSI = "RSSI",
  RSCP = "RSCP",
  RSRP = "RSRP",
  RSRQ = "RSRQ",
  SINR = "SINR",
  ECIO = "EC/IO"
}

export interface DataReport {
  "recordDate/Time": string | Date;
  technology: string;
  indicator: string;
  quality: string;
  value: number;
}

export interface DataSeries {
  name: string;
  data: number;
}

export interface CurrentUsage {
  tnsName: string;
  tx: number;
  rx: number;
  total: number;
  bandwith: number;
  percentage: number;
  overage: number;
}

export interface HistoricalUsage {
  tnsName: string;
  tx: number;
  rx: number;
  bandwith: number;
  total: number;
  percentage: number;
  overage: number;
}

export type Interval = "daily" | "weekly" | "monthly";

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

export interface DataTable {
  technology: string;
  data: SignalDataTable[];
}

export interface SignalDataTable {
  signalIndicator: string;
  signal: (string | number)[];
  statusSignal: SignalQualityType[];
}
