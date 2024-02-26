import userRoles, { IUserRolesStore } from './user-roles/user-roles';

interface Store {
  userRoles: IUserRolesStore;
}

export const store: Store = {
  userRoles: userRoles,
};
