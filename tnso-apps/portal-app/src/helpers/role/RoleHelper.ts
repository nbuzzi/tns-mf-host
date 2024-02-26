import { RolesByUserList } from "../../interfaces/auth/roleAndPermission/role";

export class RoleHelper {
  public static getAllowedRoles(role?: RolesByUserList): RolesByUserList[] {
    const roles: RolesByUserList[] = [];
    if (role && role === RolesByUserList.Basic) {
      roles.push(RolesByUserList.Basic);
    } else if (role === RolesByUserList.Admin) {
      roles.push(RolesByUserList.Basic);
      roles.push(RolesByUserList.Admin);
    } else {
      roles.push(RolesByUserList.Basic);
      roles.push(RolesByUserList.Admin);
      roles.push(RolesByUserList.SuperUser);
    }

    return roles;
  }
}
