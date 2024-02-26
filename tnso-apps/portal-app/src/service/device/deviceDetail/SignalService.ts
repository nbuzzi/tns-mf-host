import { Response } from "../../../interfaces/api/api";
import { MostRecentSignal, TNSSignal } from "../../../interfaces/devices/chart/chart";
import { DataResponse, SignalResponse } from "../../../interfaces/devices/response/response";
import { QueryParams } from "../../../interfaces/shared/queryParams";
import { BaseService } from "../../BaseService";
import { encodeParams } from "../../../helpers/api/RequestHelper";

export class SignalService extends BaseService {
  static async getMostRecent(deviceName: string): Promise<Response<MostRecentSignal> | undefined> {
    return this.get<MostRecentSignal>(`devices/${deviceName}/mostRecentSignal`);
  }

  static async getNormalized(deviceName: string, interval: string): Promise<Response<SignalResponse> | undefined> {
    return this.get<SignalResponse>(`devices/${deviceName}/normalizedSignal/${interval}`);
  }

  static async getTNSSignal(deviceName: string, interval?: string): Promise<Response<TNSSignal[]> | undefined> {
    return this.get<TNSSignal[]>(`devices/${deviceName}/tnsSignal/${interval ?? "daily"}`);
  }

  static async getDataReport(deviceName: string, params?: QueryParams): Promise<Response<DataResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<DataResponse>(`devices/${deviceName}/dataReport`, urlSearchParams);
  }
}
