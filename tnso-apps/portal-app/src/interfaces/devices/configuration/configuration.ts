export interface DeviceConfiguration {
  customerDeviceName?: string;
  deviceName?: string;
  deviceLocation: string;
  deviceStatus: string;
  macAdress?: string;
  serialNumber?: number;
  makeAndModel?: string;
  monitoringSystem?: string;
  sponsor?: string;
  ACNA?: string;
  siteName?: string;
  operationalStatus?: string;
  operationalSince?: string;
  deviceType?: string;
  tnsService?: string;
  manufacturer: string;
  protocol: string;
  serialBaudRate: string;
  pollAddress: string;
  deviceAddress: string;
  hostCharacterSet: string;
}

export interface DeviceLAN {
  lanIpAddress: string;
  lanSubnetMask: string;
}
