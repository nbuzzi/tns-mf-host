import { Roles } from "../../interfaces/auth/roleAndPermission/role";

export const RoutesByRoles = {
  // Routes by all roles
  login: [Roles.Basic, Roles.Admin, Roles.SuperUser],
  resetPassword: [Roles.Basic, Roles.Admin, Roles.SuperUser],
  forgotPassword: [Roles.Basic, Roles.Admin, Roles.SuperUser],
  profile: [Roles.Basic, Roles.Admin, Roles.SuperUser],
  contactUs: [Roles.Basic, Roles.Admin, Roles.SuperUser],
  userGuide: [Roles.Basic, Roles.Admin, Roles.SuperUser],
  // Routes by basic role and admin role
  changeManagement: [Roles.Basic, Roles.Admin],
  changeManagementDetail: [Roles.Basic, Roles.Admin],
  devices: [Roles.Basic, Roles.Admin],
  deviceDetail: [Roles.Basic, Roles.Admin],
  // Routes by admin and superuser roles
  administration: [Roles.Admin, Roles.SuperUser],
  companyProfiles: [Roles.Admin, Roles.SuperUser],
  userAdministration: [Roles.Admin, Roles.SuperUser],
  companyAdministration: [Roles.Admin, Roles.SuperUser],
  profileAdministration: [Roles.Admin, Roles.SuperUser]
};
