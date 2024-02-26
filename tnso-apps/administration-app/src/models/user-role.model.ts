export interface IUserRole {
  name: string;
  canBeDeleted?: boolean;
  userCount?: number;
  featureGroups?: IFeatureGroupsByUserRole[];
}

export interface IUserRoleAvailableResponse {
  avaialable: boolean;
}

export interface IFeatureGroupsByUserRole {
  name: string;
  associated: boolean;
}

export interface IUserAssociateByRoleResponse {
  totalRecords: number;
  returenedRecords: number;
  users: IUserAssociateByRole[];
}

export interface IUserAssociateByRole {
  username: string;
  email: string;
}

export interface IViewUserRolesList {
  roles: IUserRole[];
  
}

export interface IRoleName {
  name: string;
}
