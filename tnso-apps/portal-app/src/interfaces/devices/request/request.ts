export interface DeviceRequestProp {
  startAtRecord?: number;
  sortBy?: string;
  search?: {
    name?: string;
    service?: string;
    vendor?: string;
  };
  acnas?: string[];
  name?: string[];
}

export interface UptimeRequestProp {
  name?: string;
  month?: string;
}
