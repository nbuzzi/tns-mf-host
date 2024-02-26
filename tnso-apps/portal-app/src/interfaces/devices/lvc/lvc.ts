export interface LVCData {
  ep1DeviceName?: string;
  ep2DeviceName?: string;
  ep1Acna: string;
  ep2Acna: string;
  lvcTicketNumber: string;
  status: string;
  startDate: number | null;
  ep1Host: string;
  ep2Host: string;
  ep1RealIp: string;
  ep2RealIp: string;
  knowsEp2As: string;
  knowsEp1As: string;
  devices?: string;
}

// this is the interface for the LVC table
export interface LVCTable {
  devices: string;
  ep1Acna: string;
  ep2Acna: string;
  lvcTicketNumber: string;
  status: string;
  startDate: number | null;
  ep1Host: string;
  ep2Host: string;
  ep1RealIp: string;
  ep2RealIp: string;
  knowsEp2As: string;
  knowsEp1As: string;
}
