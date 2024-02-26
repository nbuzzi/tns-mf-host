import { Response } from "../../interfaces/api/api";
import { CompanyAvailable, CompanyProfile, CompanyProfileResponse } from "../../interfaces/companyProfiles/company";
import { QueryParams } from "../../interfaces/shared/queryParams";
import { BaseService } from "../BaseService";
import { encodeParams } from "../../helpers/api/RequestHelper";

export class CompanyProfileService extends BaseService {
  static async getAll(params?: QueryParams): Promise<Response<CompanyProfileResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<CompanyProfileResponse>("companyprofiles", urlSearchParams);
  }

  static async getByName(companyProfileName: string): Promise<Response<CompanyProfileResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>({ name: companyProfileName });
    return this.get<CompanyProfileResponse>("companyprofiles", urlSearchParams);
  }

  static async getAvailablesByUser(username: string, params?: QueryParams): Promise<Response<CompanyProfileResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<CompanyProfileResponse>(`companyprofiles/${username}/available`, urlSearchParams);
  }

  static async getAssociatedByUser(username: string, params?: QueryParams): Promise<Response<CompanyProfileResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<CompanyProfileResponse>(`companyprofiles/${username}/associated`, urlSearchParams);
  }

  static async create(companyProfile: CompanyProfile): Promise<Response<CompanyProfile> | undefined> {
    return this.post<CompanyProfile>("companyprofiles", companyProfile);
  }

  static async update(companyProfileName: string, companyProfile: CompanyProfile): Promise<Response<CompanyProfile> | undefined> {
    return this.patch<CompanyProfile>(`companyprofiles/${companyProfileName}`, companyProfile);
  }

  static delete(companyProfileName: string): Promise<Response | undefined> {
    return this.remove(`companyprofiles/${companyProfileName}`);
  }

  static async isAvailable(companyProfileName: string): Promise<Response<CompanyAvailable> | undefined> {
    return this.get<CompanyAvailable>(`companyprofiles/name/${encodeURIComponent(companyProfileName)}/available`);
  }
}
