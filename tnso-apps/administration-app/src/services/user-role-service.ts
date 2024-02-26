import { ApiService, IResponse } from '@tnso/api-core';
import {
  IUserAssociateByRoleResponse,
  IUserRole,
  IUserRoleAvailableResponse,
} from '../models/user-role.model';
import { environment } from '../environments/environment';

ApiService.setUrlBase(environment.VITE_API_URL_BASE);

export class UserRoleService extends ApiService {
  static async getRoles(): Promise<IResponse<IUserRole[]> | undefined> {
    return this.get('roles');
  }

  static async getUserAssociateByRole(
    roleName: string
  ): Promise<IResponse<IUserAssociateByRoleResponse> | undefined> {
    return this.get(`users/${roleName}/associated`);
  }

  static async getIsAvailableRole(
    roleName: string
  ): Promise<IResponse<IUserRoleAvailableResponse> | undefined> {
    return this.get(`roles/name/${roleName}/available`);
  }

  static async createRole(
    userRole: IUserRole
  ): Promise<IResponse<IUserRole> | undefined> {
    return this.post('roles', userRole);
  }
}
