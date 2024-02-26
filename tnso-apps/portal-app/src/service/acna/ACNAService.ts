import { Response } from "../../interfaces/api/api";
import { ACNAResponse } from "../../interfaces/companyProfiles/acna/acna";
import { QueryParams } from "../../interfaces/shared/queryParams";
import { BaseService } from "../BaseService";
import { encodeParams } from "../../helpers/api/RequestHelper";

export class ACNAService extends BaseService {
  static async getAll(params?: QueryParams): Promise<Response<ACNAResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<ACNAResponse>("acnas", urlSearchParams);
  }

  static async getAvailablesByCompanyProfile(companyProfileName: string, params?: QueryParams): Promise<Response<ACNAResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<ACNAResponse>(`acnas/${companyProfileName}/available`, urlSearchParams);
  }

  static async getAssociatedByCompanyProfile(companyProfileName: string, params?: QueryParams): Promise<Response<ACNAResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<ACNAResponse>(`acnas/${companyProfileName}/associated`, urlSearchParams);
  }
}
