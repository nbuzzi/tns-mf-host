export interface Group {
  acna: string;
  knownAs: string;
  totalNumberOfDevices: number;
  companyName?: string;
  connectivityStatus?: DevicesConnectionStatus;
}

export interface DevicesConnectionStatus {
  onPrimary: number;
  offline: number;
  onBackup: number;
  indeterminate: number;
  unknown: number;
}

export enum GroupStatus {
  Pending = "Pending",
  Existing = "Existing",
  Available = "Available"
}

export enum GroupFilters {
  ACNA = "ACNA",
  Member = "member",
  Country = "country",
  City = "city",
  ZipCode = "zip Code",
  TNSServiceType = "TNS Service Type",
  BoardingStatus = "boarding Status"
}
