import { Response } from "../../../interfaces/api/api";
import { DeviceConfiguration } from "../../../interfaces/devices/configuration/configuration";
import { BaseService } from "../../BaseService";

export class ConfigurationService extends BaseService {
  static async getAll(deviceName: string): Promise<Response<DeviceConfiguration> | undefined> {
    return this.get<DeviceConfiguration>(`devices/${deviceName}/configuration`);
  }
}
