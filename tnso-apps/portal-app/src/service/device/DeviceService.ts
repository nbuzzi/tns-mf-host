import { DevicesResponse } from "../../interfaces/devices/response/response";
import { Device, DeviceAddress, DeviceDetail, DeviceParams, ServiceStatus } from "../../interfaces/devices/devices";
import { BaseService } from "../BaseService";
import { Response } from "../../interfaces/api/api";
import { encodeParams } from "../../helpers/api/RequestHelper";

const defaultParams: DeviceParams = {
  startAtRecord: 0,
  recordsPerPage: 10
};

export class DeviceService extends BaseService {
  static async getAll(params: DeviceParams = defaultParams): Promise<Response<DevicesResponse> | undefined> {
    const urlSearchParams = encodeParams<DeviceParams>(params);
    return this.get<DevicesResponse>("devices", urlSearchParams);
  }

  static async getDetail(tnsDeviceName: string): Promise<Response<DeviceDetail> | undefined> {
    return this.get<DeviceDetail>(`devices/${tnsDeviceName}`);
  }

  static async create(device: Device): Promise<Response<Device> | undefined> {
    return this.post<Device>("devices", device);
  }

  static async delete(deviceName: string): Promise<Response<Device> | undefined> {
    return this.remove<Device>(`devices/${deviceName}`);
  }

  static async getStatus(params?: DeviceParams): Promise<Response<ServiceStatus> | undefined> {
    const urlSearchParams = encodeParams<DeviceParams>(params as DeviceParams);
    return this.get<ServiceStatus>("devices/count/connectivityStatus", urlSearchParams);
  }

  static async updateAddress(data: DeviceAddress, tnsDeviceName: string): Promise<Response<DeviceAddress> | undefined> {
    return this.patch<DeviceAddress>(`devices/${tnsDeviceName}/address`, data);
  }
}
