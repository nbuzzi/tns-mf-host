import { Roles } from "../roleAndPermission/role";

export interface TokenPayload {
  exp: number;
  iat: number;
  role: Roles;
  username: string;
  sub?: string;
}
