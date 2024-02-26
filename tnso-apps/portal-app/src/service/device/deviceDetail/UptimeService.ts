import { Response } from "../../../interfaces/api/api";
import { Day, Month } from "../../../interfaces/devices/chart/chart";
import { BaseService } from "../../BaseService";

export class UptimeService extends BaseService {
  static async getMonthly(deviceName: string): Promise<Response<Month[]> | undefined> {
    return this.get<Month[]>(`devices/${deviceName}/uptime/monthly`);
  }

  static async getDaily(deviceName: string, month?: string): Promise<Response<Day[]> | undefined> {
    return this.get<Day[]>(`devices/${deviceName}/uptime/daily/${month}`);
  }
}
