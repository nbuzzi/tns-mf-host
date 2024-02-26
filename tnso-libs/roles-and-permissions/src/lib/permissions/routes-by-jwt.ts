import { jwtDecode } from 'jwt-decode';
import { IJwtContent } from '../models/jwt-content.model';
import { Mapper } from '../utils/mapper';
import { Roles } from '../models/role.model';
import { IAuthorizationInfo } from '../models/authorization.model';

export class Authorization {
  public routes: string[] = [];

  public static getRoutesByJwt(jwt: string): string[] {
    const jwtContent: IJwtContent = jwtDecode(jwt);
    const menuItems: string[] = Mapper.featureListToMenuItems(jwtContent.menu);
    return menuItems;
  }

  public static getAuthByToken(
    token: string | null
  ): IAuthorizationInfo | undefined {
    if (token) {
      const jwtContent: IJwtContent = jwtDecode(token);
      const { Basic, Admin, SuperUser } = Roles;

      return {
        username: jwtContent.username,
        role: jwtContent.role,
        isBasic: jwtContent.role === Basic,
        isAdmin: jwtContent.role === Admin,
        isSuperUser: jwtContent.role === SuperUser,
      };
    }
  }
}
