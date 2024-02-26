import { RolesByUserList } from "../auth/roleAndPermission/role";

export interface User {
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled?: boolean;
  credentialsExpired?: boolean;
  accountLocked?: boolean;
  companyProfiles?: string[] | string;
  lastLogin?: string;
  timeZone?: string;
  role?: RolesByUserList;
  status?: UserStatus;
  actAs?: string;
  onboarded?: boolean;
}

export enum UserStatus {
  Enabled = "Enabled",
  Expired = "Expired",
  Locked = "Locked",
  Disabled = "Disabled"
}

export interface UserTable {
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled?: string;
  credentialsExpired?: boolean;
  accountLocked?: boolean;
  companyProfiles?: string | string[];
  lastLogin?: string;
  timeZone?: string;
  role?: RolesByUserList;
  status?: UserStatus;
  onboarded?: boolean;
}

export interface UserWithCompanyProfiles {
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  role?: RolesByUserList;
  phoneNumber?: string;
  companyProfiles?: string[];
}

export interface UserResponse {
  totalRecords: number;
  returnedRecords: number;
  users: User[];
}

export interface AvailableByUsername {
  available: boolean;
}

export interface AvailableByEmail {
  available: boolean;
}
// This interface will be removed when the new credentialsExpired logic is done
export interface UserAlternative {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  enabled?: boolean;
  credentialsExpired?: boolean | string;
  accountLocked?: boolean;
  companyProfiles?: string[];
  lastLogin?: string;
  timeZone?: string;
  role?: RolesByUserList;
  status?: UserStatus;
}
