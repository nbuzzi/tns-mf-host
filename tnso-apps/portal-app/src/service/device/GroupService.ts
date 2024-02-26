import { Response } from "../../interfaces/api/api";
import { Group } from "../../interfaces/devices/group/group";
import { QueryParams } from "../../interfaces/shared/queryParams";

import { BaseService } from "../BaseService";
import { encodeParams } from "../../helpers/api/RequestHelper";

export class GroupService extends BaseService {
  static async getAll(params?: QueryParams): Promise<Response<Group[]> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<Group[]>("devices/groups/members", urlSearchParams);
  }

  static async getById(parentId: string): Promise<Response<Group> | undefined> {
    return this.get<Group>(`devices/groups/${parentId}`);
  }

  static async getByParentId(parentId: number): Promise<Response<Group[]> | undefined> {
    return this.get<Group[]>(`devices/groups/parent/${parentId}`);
  }

  static async create(group: Group): Promise<Response<Group> | undefined> {
    return this.post<Group>("devices/groups", group);
  }

  static async update(group: Group | Group[]): Promise<Response<Group | Group[]> | undefined> {
    return this.put<Group | Group[]>("devices/groups", group);
  }

  // member
  static async getByMemberName(memberName: string): Promise<Response<Group[]> | undefined> {
    return this.get<Group[]>(`devices/groups/member/${memberName}`);
  }
}
