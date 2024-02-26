import { SortOrder } from "antd/lib/table/interface";
import { Key } from "react";

export interface QueryParams {
  sortBy?: string | Key;
  startAtRecord?: number;
  recordsPerPage?: number;
  search?: Record<string, string[]> | string;
  status?: string;
  startDate?: string;
  endDate?: string;
  countries?: string;
  country?: string;
  city?: string;
  zipCode?: string;
  orderBy?: string | SortOrder;
  name?: string;
  hasGeolocation?: boolean;
  username?: string;
  tnsDeviceName?: string;
}
