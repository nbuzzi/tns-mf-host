export interface Technologies {
  "2G": Technology;
  "3G"?: Technology[];
  "4G"?: Technology[];
  "5G"?: Technology[];
  others?: Technology[];
}

export enum Technology {
  RSSI3G = "3G RSSI",
  ECIO3G = "3G EC/IO",
  RSSI4G = "4G RSSI",
  RSRP4G = "4G RSRP",
  SINR4G = "4G SINR",
  TNSNormalized = "TNS Normalized",
  signalQuality = "Signal Quality"
}
