import { Response } from "../../../interfaces/api/api";
import { DeviceLAN } from "../../../interfaces/devices/configuration/configuration";
import { BaseService } from "../../BaseService";

export class LANService extends BaseService {
  static async getAll(deviceName: string): Promise<Response<DeviceLAN> | undefined> {
    return this.get<DeviceLAN>(`devices/${deviceName}/lan`);
  }
}
