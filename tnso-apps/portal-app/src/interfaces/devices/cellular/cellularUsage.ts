import { QueryParams } from "../../../interfaces/shared/queryParams";

export interface CellularUsage {
  name: string;
  startDate: string;
  endDate: string;
  planSize: number;
  rxcnt: number;
  txcnt: number;
  total: number;
  percent: number;
  overage: number;
  predictedOverage: number;
}

export interface CellularUsageTable {
  "TNS Device Name": string;
  "Billing Period": string;
  "Actual Data Plan": string;
  "TX Data": string;
  "RX Data": string;
  "Total Data": string;
  "Percent Consumed": string;
  "Actual Overage": string;
}

export interface CellularUsageBillingPeriod {
  name: string;
  startDate: string;
  endDate: string;
}

export enum DailyUsageStatus {
  ACTUAL_NO_OVERAGE = "ACTUAL_NO_OVERAGE",
  ACTUAL_OVERAGE = "ACTUAL_OVERAGE",
  PREDICTED_OVERAGE = "PREDICTED_OVERAGE",
  PREDICTED_NO_OVERAGE = "PREDICTED_NO_OVERAGE"
}

export interface DailyDeviceUsage {
  name: string;
  date: string;
  total: number;
  status: DailyUsageStatus;
}

export interface CellularUsageBilling extends CellularUsage {
  dailyDeviceUsage: DailyDeviceUsage[];
}

export interface CellularParams extends QueryParams {
  startDate: string;
  endDate: string;
}

export interface Wireless {
  isWireless: boolean;
}
