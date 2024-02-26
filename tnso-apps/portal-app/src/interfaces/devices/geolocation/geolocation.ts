import { ConnectivityStatus } from "../devices";

export interface Geolocation {
  tnsDeviceName: string;
  acna?: string;
  connectivityStatus: ConnectivityStatus;
  latitude: number;
  longitude: number;
}

export interface HasGeolocation {
  count: number;
}

export const enum OptionsGeolocationTable {
  yes = "yes",
  no = "no",
  all = "all"
}

