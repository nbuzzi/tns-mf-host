import { Roles } from "../roleAndPermission/role";

export interface User {
  username: string;
  password: string;
}

export interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  timeZone: string;
  role?: Roles;
  companyProfilesList?: string[];
  enabled?: boolean;
}

export interface ActAsPayload {
  username: string;
}
