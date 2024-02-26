import { Response } from "../../../interfaces/api/api";
import { QueryParams } from "../../../interfaces/shared/queryParams";
import { LVCResponse } from "../../../interfaces/devices/response/response";
import { BaseService } from "../../BaseService";
import { encodeParams } from "../../../helpers/api/RequestHelper";

export class LVCService extends BaseService {
  static async getAll(deviceName: string, params?: QueryParams): Promise<Response<LVCResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<LVCResponse>(`devices/${deviceName}/lvc`, urlSearchParams);
  }
}
