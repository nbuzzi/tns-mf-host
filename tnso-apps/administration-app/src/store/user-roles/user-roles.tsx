import { makeAutoObservable } from 'mobx';
import {
  IUserAssociateByRoleResponse,
  IUserRole,
  IUserRoleAvailableResponse,
} from '../../models/user-role.model';
import { UserRoleService } from '../../services/user-role-service';
import { StatusCode } from '@tnso/api-core';
import { TNSONotification } from '@tnso/ui-components/dist';
import { TRANSLATION } from '../../translations/translation';

export interface IUserRolesStore {
  roles: IUserRole[];
  usersAssociateByRole: IUserAssociateByRoleResponse;

  getRoles(): Promise<void>;
  getUserAssociateByRole(roleName: string): Promise<void>;
  getIsAvailableRole(roleName: string): void;
  createRole(userRole: IUserRole): Promise<number | undefined>;
}

class UserRoles implements IUserRolesStore {
  roles: IUserRole[] = [];
  usersAssociateByRole: IUserAssociateByRoleResponse = {
    totalRecords: 0,
    returenedRecords: 0,
    users: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  getRoles = async (): Promise<void> => {
    try {
      const response = await UserRoleService.getRoles();
      if (response?.data && response.status === StatusCode.OK) {
        this.roles = response.data;
      }
    } catch (error) {
      console.warn(error);
    }
  };

  getUserAssociateByRole = async (roleName: string): Promise<void> => {
    try {
      const response = await UserRoleService.getUserAssociateByRole(roleName);
      if (response?.data && response.status === StatusCode.OK) {
        this.usersAssociateByRole = response.data;
      }
    } catch (error) {
      console.warn(error);
    }
  };

  getIsAvailableRole = async (
    roleName: string
  ): Promise<IUserRoleAvailableResponse | undefined> => {
    try {
      const response = await UserRoleService.getIsAvailableRole(roleName);
      return response?.data;
    } catch (error) {
      console.warn(error);
    }
  };

  async createRole(userRole: IUserRole): Promise<number | undefined> {
    try {
      const response = await UserRoleService.createRole(userRole);
      if (
        response?.status === StatusCode.OK ||
        response?.status === StatusCode.NO_CONTENT
      ) {
        TNSONotification.success(
          TRANSLATION.USER_ROLES.CREATE_ROLE.roleCreatedSuccessfully
        );
      }
    } catch (error) {
      return StatusCode.BAD_REQUEST;
    }
  }
}

const userRoles = new UserRoles();

export default userRoles;
