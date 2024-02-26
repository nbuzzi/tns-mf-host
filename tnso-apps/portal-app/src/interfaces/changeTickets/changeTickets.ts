import { QueryParams } from "../shared/queryParams";

export interface ChangeTicketsResponse {
  changeTickets: ChangeTicket[];
  totalRecords: number;
  returnedRecords: number;
}

export interface ChangeTicket {
  changeTicketId: string;
  changeStartTime: number;
  companyName: string;
  changeDescription: string;
  statusOfChange: ChangeTicketStatus;
  maximumDuration: number;
  impactType: ChangeTicketImpact;
}

export interface ChangeTicketsExport {
  "Start Date/Time": string;
  "TNS Ticket": string;
  "Company Name": string;
  "Reason for Change": string;
  Impact: string;
  Status: string;
  "Max. Duration (Hrs)": string;
}

export interface ChangeTicketDetails {
  type: ChangeTicketType;
  impactType: ChangeTicketImpact;
  statusOfChange: ChangeTicketStatus;
  changeStartTime: number;
  maximumDuration: number;
  reasonForChange: string;
  changesPlanned: string;
  changeImpact: string;
  devices: DeviceMamagement[];
}

export interface DeviceMamagement {
  tnsDeviceName: string;
  companyName: string;
  customerDeviceName: string;
  customerSiteName: string;
  merchantName: string;
}

export interface ScheduleDevice {
  tnsDeviceName: string;
  customerDeviceName: string;
}

export enum ChangeTicketStatus {
  Requested = "Requested",
  Approved = "Approved",
  Rejected = "Rejected",
  Cancelled = "Cancelled",
  Completed = "Completed",
  InProgress = "InProgress",
  Scheduled = "Scheduled",
  Pending = "Pending",
  Failed = "Failed",
  Unknown = "Unknown"
}

export enum ScheduleGraphStatus {
  Approved = "Approved",
  Cancelled = "Cancelled",
  InProgress = "In Progress",
  Completed = "Completed",
  Requested = "Requested"
}

export enum ChangeTicketImpact {
  Minor = "Minor",
  Major = "Major",
  Critical = "Critical"
}

export enum ChangeTicketType {
  Standard = "Standard",
  Emergency = "Emergency",
  "3rd Party" = "3rd Party"
}

export interface ScheduleGraphResponse {
  changeTickets: ScheduleGraph[];
  totalRecords: number;
  returnedRecords: number;
}

export interface ScheduleGraph {
  changeTicketId: string;
  statusOfChange: ChangeTicketStatus;
  changeStartTime: number;
  deviceCount: number;
  devices?: ScheduleDevice[];
}

export interface ChangeTicketsParams extends QueryParams {
  changeTicketId?: string;
  changeStartTime?: number;
  companyName?: string;
}
