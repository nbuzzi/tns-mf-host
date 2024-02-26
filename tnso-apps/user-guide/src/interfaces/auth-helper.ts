import { Roles } from "./role-and-permission/role";
import { TokenPayload } from "./login/token"
import { jwtDecode } from "jwt-decode";
import { RoutesByRoles } from "../config/authorization/routesByRoles";

export interface AuthInfo {
  username: string | null;
  role: Roles;
  isBasic: boolean;
  isAdmin: boolean;
  isSuperUser: boolean;
}

export class AuthHelper {
  static username: string | null = null;
  static role: Roles = Roles.Basic;
  static isBasic = true;
  static isAdmin = false;
  static isSuperUser = false;

  public static getAuthByToken(token: string | null): AuthInfo {
    if (token) {
      const decode: TokenPayload = jwtDecode(token);
      const { Basic, Admin, SuperUser } = Roles;

      this.username = decode.username;
      this.role = decode.role;
      this.isBasic = this.role === Basic;
      this.isAdmin = this.role === Admin;
      this.isSuperUser = this.role === SuperUser;
    }

    return {
      username: this.username,
      role: this.role,
      isBasic: this.isBasic,
      isAdmin: this.isAdmin,
      isSuperUser: this.isSuperUser
    };
  }

  public static getAllowedRolesForRoute(routeName: string): Roles[] {
    return RoutesByRoles[routeName as keyof typeof RoutesByRoles];
  }
}
