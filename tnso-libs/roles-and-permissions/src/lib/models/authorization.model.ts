import { Roles } from './role.model';

export interface IAuthorizationInfo {
  username: string | null;
  role: Roles;
  isBasic: boolean;
  isAdmin: boolean;
  isSuperUser: boolean;
}
