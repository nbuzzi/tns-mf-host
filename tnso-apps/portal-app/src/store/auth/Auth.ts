import { makeAutoObservable } from 'mobx';
import { Roles } from '../../interfaces/auth/roleAndPermission/role';
import { MessageHelper } from '../../helpers/shared/MessageHelper';
import { TokenHelper } from '../../helpers/token/TokenHelper';
import { User, UserInfo } from '../../interfaces/auth/login/login';
import { SignInResponse } from '../../interfaces/auth/response/response';
import { AuthService } from '../../service/auth/AuthService';
import { UserService } from '../../service/user/UserService';
import { TRANSLATION } from '../../../src/utils/const/translation';
import { i18nInstance as i18n } from '../../i18n';
import { StorageHelper } from '../../helpers/shared/StorageHelper';
import { store } from '../StoreMobx';
import { MenuKeys } from '../../layouts/sidebars/vertical/Sidebar';

export interface IAuth {
  data?: SignInResponse;
  user?: User;
  userInfo: UserInfo | null;
  isLogged: boolean;
  signInResponse?: SignInResponse;
  userDecoded?: UserInfo;
  sessionId?: string;
  isActAs: boolean;
  login: (user: User) => Promise<SignInResponse | undefined>;
  logout: () => void;
  actAs: (username: string) => Promise<void>;
  stopActAs: () => void;
}
class Auth implements IAuth {
  data?: SignInResponse = undefined;
  user?: User = undefined;
  userInfo: UserInfo | null = null;
  isLogged = false;
  signInResponse?: SignInResponse = undefined;
  userDecoded?: UserInfo = undefined;
  sessionId?: string = undefined;
  isActAs = false;
  constructor() {
    makeAutoObservable(this);
    this.userInfo = StorageHelper.gteItemParsed<UserInfo>('user');
    this.isActAs = StorageHelper.getItem('actAs') === '' ? true : false;
  }
  login = async (user: User): Promise<SignInResponse | undefined> => {
    try {
      const data = await AuthService.signIn(user);
      if (data) {
        this.data = data as SignInResponse;
        this.isLogged = true;
        this.userDecoded = await TokenHelper.setUserInfoByToken(
          this.data.accessToken
        );
        this.sessionId = new Date().getTime().toString();
        localStorage.setItem('sessionId', this.sessionId);
        localStorage.setItem('accessToken', this.data.accessToken);
        localStorage.setItem('refreshToken', this.data.refreshToken);
        localStorage.setItem('originalAccessToken', this.data.accessToken);
        localStorage.setItem('originalRefreshToken', this.data.refreshToken);
        if (this.userDecoded) {
          StorageHelper.setItem(
            'user',
            JSON.stringify({
              username: this.userDecoded.username,
              firstName: this.userDecoded.firstName,
              lastName: this.userDecoded.lastName,
              email: this.userDecoded.email,
              timeZone: this.userDecoded.timeZone,
              role: this.userDecoded.role,
              companyProfilesList: this.userDecoded.companyProfilesList,
            })
          );
        }
        this.userInfo = {
          username: this.userDecoded?.username || '',
          firstName: this.userDecoded?.firstName || '',
          lastName: this.userDecoded?.lastName || '',
          email: this.userDecoded?.email || '',
          timeZone: this.userDecoded?.timeZone || '',
          role: this.userDecoded?.role || Roles.Basic,
          companyProfilesList: this.userDecoded?.companyProfilesList || [],
        };
        if (this.userDecoded?.role === Roles.SuperUser) {
          store.shared.setOpenKeys([MenuKeys.Administration]);
          store.shared.setMenuItemSelected(MenuKeys.CompanyAdministration);
        } else {
          store.shared.setOpenKeys([MenuKeys.Monitoring]);
          store.shared.setMenuItemSelected(MenuKeys.Devices);
        }
        await TokenHelper.validateExpiredToken(
          this.data.accessToken,
          this.data.refreshToken
        );
        return this.data;
      }
    } catch (error) {
      console.warn(`${i18n.t(TRANSLATION.ERROR.errorSigningIn)} ${error}`);
    }
  };
  logout = (): void => {
    this.data = undefined;
    this.isLogged = false;
    this.userDecoded = undefined;
    this.sessionId = undefined;
    localStorage.clear();
    window.location.reload();
  };
  actAs = async (username: string): Promise<void> => {
    try {
      const originalAccessToken = localStorage.getItem('originalAccessToken');
      const originalRefreshToken = localStorage.getItem('originalRefreshToken');
      const response = await UserService.actAs({ username });
      if (response?.data && originalAccessToken && originalRefreshToken) {
        this.data = response.data as SignInResponse;
        this.userDecoded = await TokenHelper.setUserInfoByToken(
          this.data.accessToken
        );
        this.isActAs = true;
        await TokenHelper.validateExpiredToken(
          this.data.accessToken,
          this.data.refreshToken
        );
        StorageHelper.clear();
        if (this.userDecoded) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              username: this.userDecoded.username,
              firstName: this.userDecoded.firstName,
              lastName: this.userDecoded.lastName,
              email: this.userDecoded.email,
              timeZone: this.userDecoded.timeZone,
              role: this.userDecoded.role,
              companyProfilesList: this.userDecoded.companyProfilesList,
            })
          );
        }
        localStorage.setItem('actAs', 'true');
        localStorage.setItem('accessToken', this.data.accessToken);
        localStorage.setItem('refreshToken', this.data.refreshToken);
        localStorage.setItem('originalAccessToken', originalAccessToken);
        localStorage.setItem('originalRefreshToken', originalRefreshToken);
        if (
          this.userDecoded?.role === Roles.SuperUser ||
          this.userDecoded?.role === Roles.Admin
        ) {
          store.shared.setOpenKeys([MenuKeys.Administration]);
          store.shared.setMenuItemSelected(MenuKeys.UserAdministration);
          window.location.replace('/administration/user');
        } else {
          store.shared.setOpenKeys([MenuKeys.Monitoring]);
          store.shared.setMenuItemSelected(MenuKeys.Devices);
          window.location.replace('/');
        }
      }
    } catch (error) {
      MessageHelper.errorMessage(
        `${i18n.t(TRANSLATION.MODAL.ALERT.errorActingAsUser)}, ${error}`
      );
    }
  };
  stopActAs = async (): Promise<void> => {
    try {
      const originalAccessToken = localStorage.getItem('originalAccessToken');
      const originalRefreshToken = localStorage.getItem('originalRefreshToken');
      if (originalAccessToken && originalRefreshToken) {
        this.userDecoded = await TokenHelper.setUserInfoByToken(
          originalAccessToken
        );
        if (this.userDecoded) {
          StorageHelper.setItem(
            'user',
            JSON.stringify({
              username: this.userDecoded.username,
              firstName: this.userDecoded.firstName,
              lastName: this.userDecoded.lastName,
              email: this.userDecoded.email,
              timeZone: this.userDecoded.timeZone,
              role: this.userDecoded.role,
              companyProfilesList: this.userDecoded.companyProfilesList,
            })
          );
        }
        StorageHelper.setItem('accessToken', originalAccessToken);
        StorageHelper.setItem('refreshToken', originalRefreshToken);
        StorageHelper.removeItem('actAs');
        this.isActAs = false;
        if (
          this.userDecoded?.role === Roles.SuperUser ||
          this.userDecoded?.role === Roles.Admin
        ) {
          store.shared.setOpenKeys([MenuKeys.Administration]);
          store.shared.setMenuItemSelected(MenuKeys.UserAdministration);
          window.location.replace('/administration/user');
        } else {
          store.shared.setOpenKeys([MenuKeys.Monitoring]);
          store.shared.setMenuItemSelected(MenuKeys.Devices);
          window.location.replace('/monitoring/devices');
        }
      }
    } catch (error) {
      MessageHelper.errorMessage(
        `${i18n.t(TRANSLATION.ERROR.errorStoppingActAsUser)}, ${error}`
      );
    }
  };
}
const auth = new Auth();
export default auth;
