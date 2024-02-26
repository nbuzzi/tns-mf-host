import { Response } from "../../interfaces/api/api";
import { BaseService } from "../BaseService";
import { HasMemberConnectivity, HasMemberDevice, MemberConnectivityParams, MembersGraphResponse, MembersResponse } from "../../interfaces/memberConnectivity/memberConnectivity";
import { encodeParams } from "../../helpers/api/RequestHelper";

export class MemberConnectivityService extends BaseService {
  static async getAll(acnas?: string, params?: MemberConnectivityParams): Promise<Response<MembersResponse> | undefined> {
    const urlSearchParams = encodeParams<MemberConnectivityParams>(params as MemberConnectivityParams);
    return this.get<MembersResponse>(`members/${acnas}`, urlSearchParams);
  }

  static async getConnectedGraph(acna?: string): Promise<Response<MembersGraphResponse> | undefined> {
    return this.get<MembersGraphResponse>(`members/${acna}/connectedGraph`);
  }

  static async getHasMemberConnectivity(): Promise<Response<HasMemberConnectivity> | undefined> {
    return this.get<HasMemberConnectivity>("members/hasMemberConnectivity");
  }

  static async getHasMemberDevice(tnsDeviceName: string): Promise<Response<HasMemberDevice> | undefined> {
    return this.get<HasMemberDevice>(`members/hasMemberConnectivity/${tnsDeviceName}`);
  }
}
