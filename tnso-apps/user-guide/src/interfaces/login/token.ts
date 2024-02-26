import { Roles } from "../role-and-permission/role";

export interface TokenPayload {
  exp: number;
  iat: number;
  role: Roles;
  username: string;
  sub?: string;
}
