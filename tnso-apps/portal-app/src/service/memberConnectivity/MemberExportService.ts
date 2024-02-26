import { Response } from "../../interfaces/api/api";
import { BaseService } from "../BaseService";
import { MemberConnectivityParams, MembersExportResponse } from "../../interfaces/memberConnectivity/memberConnectivity";
import { encodeParams } from "../../helpers/api/RequestHelper";

export class MemberExportService extends BaseService {
  static async getAll(params?: MemberConnectivityParams): Promise<Response<MembersExportResponse> | undefined> {
    const urlSearchParams = encodeParams<MemberConnectivityParams>(params as MemberConnectivityParams);
    return this.get<MembersExportResponse>("members/export", urlSearchParams);
  }
}
