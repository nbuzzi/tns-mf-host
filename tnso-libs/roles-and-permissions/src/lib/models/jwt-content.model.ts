import { IMenu } from './menu.model';
import { Roles } from './role.model';

export interface IJwtContent {
  iat: number;
  role: Roles;
  username: string;
  sub?: string;
  menu: IMenu[];
}
