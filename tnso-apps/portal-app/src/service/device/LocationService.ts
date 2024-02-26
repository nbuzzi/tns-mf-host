import { Response } from "../../interfaces/api/api";
import { HasGeolocation } from "../../interfaces/devices/geolocation/geolocation";
import { GeolocationResponse } from "../../interfaces/devices/response/response";
import { QueryParams } from "../../interfaces/shared/queryParams";
import { BaseService } from "../BaseService";
import { encodeParams } from "../../helpers/api/RequestHelper";

export class LocationService extends BaseService {
  static async getAll(params?: QueryParams): Promise<Response<GeolocationResponse[]> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<GeolocationResponse[]>("devices/geolocation", urlSearchParams);
  }

  static async gethasGeolocation(): Promise<Response<HasGeolocation> | undefined> {
    return this.get<HasGeolocation>("devices/count/nogeolocation");
  }

  static async getByGroupId(groupId: number, params?: QueryParams): Promise<Response<GeolocationResponse[]> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<GeolocationResponse[]>(`devices/locations/group/${groupId}`, urlSearchParams);
  }

  static async getByName(deviceName: string): Promise<Response<GeolocationResponse> | undefined> {
    return this.get<GeolocationResponse>(`devices/${deviceName}/locations`);
  }

  static async create(deviceLocation: GeolocationResponse): Promise<Response<GeolocationResponse> | undefined> {
    return this.post<GeolocationResponse>("devices/locations", deviceLocation);
  }
}
