import { encodeParams } from "helpers/api/RequestHelper";
import { Response } from "../../../interfaces/api/api";
import { CellularParams, CellularUsage, CellularUsageBilling, CellularUsageBillingPeriod, Wireless } from "../../../interfaces/devices/cellular/cellularUsage";
import { BaseService } from "../../../service/BaseService";

export class CellularUsageService extends BaseService {
  static async getHistorical(tnsDeviceName: string): Promise<Response<CellularUsage[]> | undefined> {
    return this.get<CellularUsage[]>(`devices/${tnsDeviceName}/usage/historical`);
  }

  static async getBillingPeriod(tnsDeviceName: string): Promise<Response<CellularUsageBillingPeriod[]> | undefined> {
    return this.get<CellularUsageBillingPeriod[]>(`devices/${tnsDeviceName}/usage/billingPeriods`);
  }

  static async getBilling(params?: CellularParams): Promise<Response<CellularUsageBilling> | undefined> {
    const urlSearchParams = encodeParams<CellularParams>(params as CellularParams);
    return this.get<CellularUsageBilling>("devices/usage/billing", urlSearchParams);
  }

  static async getCurrent(tnsDeviceName: string): Promise<Response<CellularUsage> | undefined> {
    return this.get<CellularUsage>(`devices/${tnsDeviceName}/usage/current`);
  }

  static async getWireless(tnsDeviceName: string): Promise<Response<Wireless> | undefined> {
    return this.get<Wireless>(`devices/${tnsDeviceName}/wireless`);
  }
}
