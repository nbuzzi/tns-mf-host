import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { StatusCode } from '../../helpers/api/RequestHelper';
import { QueryParams } from '../../interfaces/shared/queryParams';
import { MessageHelper } from '../../helpers/shared/MessageHelper';
import { RolesByUserList } from '../../interfaces/auth/roleAndPermission/role';
import {
  AvailableByEmail,
  AvailableByUsername,
  UserAlternative,
  User as UserModel,
  UserResponse,
  UserStatus,
} from '../../interfaces/users/user';
import { UserService } from '../../service/user/UserService';
import { TRANSLATION } from '../../utils/const/translation';
import { i18nInstance as i18n } from '../../i18n';

import { store } from '../StoreMobx';
export interface IUser {
  data?: UserResponse;
  userSelected?: UserModel;
  prevParams?: QueryParams;
  showModal: boolean;
  activeFilters: Record<string, string>;

  loadData: (params?: QueryParams) => Promise<void>;
  loadUserByUsername: (username: string) => Promise<void>;
  createByRole: (role: RolesByUserList, user: UserModel) => Promise<void>;
  updateByRole: (
    role: RolesByUserList,
    user: UserModel,
    username: string
  ) => Promise<void>;
  setActiveFiltersData: (keyFilter: string, valueFilter: string) => void;
  updateOwnUser: (user: UserAlternative) => Promise<boolean>;
  isAvailableByEmail: (email: string) => Promise<AvailableByEmail | undefined>;
  isAvailableByUsername: (
    username: string
  ) => Promise<AvailableByUsername | undefined>;
  setUser: (user: UserModel) => void;
  setUserEnabled: (enabled: boolean) => void;
  setShowModal: (isShowModal: boolean) => void;
  setCompanyProfiles: (companyProfiles: string) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (password: string, token: string) => Promise<void>;
  cleanUser: () => void;
  assignStatus: (isActive: boolean, isLocked: boolean) => void;
}

// eslint-disable-next-line
// @ts-ignore
class User implements IUser {
  data?: UserResponse = undefined;
  userSelected?: UserModel = undefined;
  prevParams?: QueryParams = undefined;
  showModal = false;
  activeFilters: Record<string, string> = {};

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (params?: QueryParams): Promise<void> => {
    try {
      const response = await UserService.getAll(params);
      if (response?.data) {
        const users = response.data.users.map((user) => ({
          ...user,
          status: this.assignStatus(
            user.credentialsExpired,
            user.accountLocked,
            user.enabled
          ),
        }));
        this.data = { ...response.data, users };
      }
    } catch (error) {
      MessageHelper.errorMessage(
        `${i18n.t(TRANSLATION.ERROR.errorLoadingUsers)} , ${i18n.t(
          TRANSLATION.ERROR[error as keyof typeof TRANSLATION.ERROR]
        )}`
      );
    }
  };
  loadUserByUsername = async (username: string): Promise<void> => {
    try {
      const response = await UserService.getByUsername(username);
      if (response?.data) {
        this.userSelected = response.data.users[0];
      }
    } catch (error) {
      MessageHelper.errorMessage(
        `${i18n.t(TRANSLATION.ERROR.errorLoadingUsers)} , ${i18n.t(
          TRANSLATION.ERROR[error as keyof typeof TRANSLATION.ERROR]
        )}`
      );
    }
  };

  createByRole = async (
    role: RolesByUserList,
    user: UserModel
  ): Promise<void> => {
    try {
      const result = await UserService.createByRole(
        role.toLowerCase() as RolesByUserList,
        user
      );
      if (result?.status === StatusCode.NO_CONTENT) {
        MessageHelper.successMessage(
          i18n.t(
            TRANSLATION.SIDEBAR.ADMINISTRATION.USER.userCreatedSuccessfully
          )
        );
        if (user.username) {
          await store.companyProfile.loadAvailablesByUser(user.username, {
            startAtRecord: 0,
            recordsPerPage: 10,
          });
          await store.companyProfile.loadAssociatedByUser(user.username, {
            startAtRecord: 0,
            recordsPerPage: 10,
          });
        }
      }
      await this.loadData(this.prevParams);
    } catch (error) {
      MessageHelper.errorMessage(
        i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.USER.errorCreatingUser)
      );
    }
  };

  updateByRole = async (
    role: RolesByUserList,
    user: UserModel,
    username: string
  ): Promise<void> => {
    try {
      // THIS LOGIC WILL BE REPLACED WHEN THE REDISIGN FOR THE USER TABLE IS DONE
      const userAlt: UserAlternative = user as UserAlternative;
      if (user.credentialsExpired === false) {
        userAlt.credentialsExpired = '';
      }
      // -------------------------------------------------------------------------
      await UserService.updateByRole(
        role.toLowerCase() as RolesByUserList,
        userAlt,
        username
      );
      MessageHelper.successMessage(
        i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.USER.userUpdatedSuccessfully)
      );
    } catch (error) {
      MessageHelper.errorMessage(
        i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.USER.errorUpdatingUser)
      );
    }
  };

  updateOwnUser = async (user: UserAlternative): Promise<boolean> => {
    try {
      const data = await UserService.updateOwnProfile(user);
      if (data?.status === StatusCode.NO_CONTENT) {
        MessageHelper.successMessage(
          i18n.t(
            TRANSLATION.SIDEBAR.ADMINISTRATION.USER.userUpdatedSuccessfully
          )
        );
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
          const userParsed = JSON.parse(userInfo);
          const updatedUser = { ...userParsed, ...user };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        return true;
      }
      return false;
    } catch (error) {
      MessageHelper.errorMessage(
        i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.USER.errorUpdatingUser)
      );
      return false;
    }
  };

  isAvailableByEmail = async (
    email: string
  ): Promise<AvailableByEmail | undefined> => {
    try {
      const response = await UserService.isAvailableByEmail(email);
      return response?.data;
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.ERROR.errorCheckingEmail));
    }
  };

  setActiveFiltersData = (keyFilter: string, valueFilter: string): void => {
    this.activeFilters[keyFilter] = valueFilter;
  };

  setUserEnabled = async (enabled: boolean): Promise<void> => {
    if (this.userSelected) {
      this.userSelected.enabled = enabled;
    }
  };

  setCompanyProfiles = async (companyProfiles: string): Promise<void> => {
    if (this.userSelected) {
      this.userSelected.companyProfiles = companyProfiles;
    }
  };

  setShowModal = (isShowModal: boolean): void => {
    this.showModal = isShowModal;
  };
  isAvailableByUsername = async (
    username: string
  ): Promise<AvailableByUsername | undefined> => {
    try {
      const response = await UserService.isAvailableByUsername(username);
      return response?.data;
    } catch (error) {
      MessageHelper.errorMessage(
        i18n.t(TRANSLATION.ERROR.errorCheckingUsername)
      );
    }
  };

  setUser = (user: UserModel): void => {
    this.userSelected = user;
  };

  cleanUser = (): void => {
    this.userSelected = undefined;
    this.data = undefined;
    store.companyProfile.cleanavailableDataAndAssociatedData();
  };

  forgotPassword = async (email: string): Promise<void> => {
    try {
      const result = (await UserService.forgotPassword(email)) as AxiosResponse;
      if (
        result.status === StatusCode.OK ||
        result.status === StatusCode.NO_CONTENT
      ) {
        MessageHelper.successMessage(
          i18n.t(TRANSLATION.LOGIN.confirmationSentEmailDescription)
        );
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.ERROR.errorSendingEmail));
    }
  };

  resetPassword = async (password: string, guid: string): Promise<void> => {
    try {
      const result = (await UserService.resetPassword(
        password,
        guid
      )) as AxiosResponse;
      if (
        result.status === StatusCode.OK ||
        result.status === StatusCode.NO_CONTENT
      ) {
        MessageHelper.successMessage(
          i18n.t(TRANSLATION.MODAL.ALERT.passwordResetSuccessfully)
        );
        setTimeout(() => {
          localStorage.clear();
          window.location.replace('/auth/login');
        }, 2000);
      }
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        MessageHelper.errorMessage(
          i18n.t(TRANSLATION.MODAL.ALERT.passwordTockenHasBeenExpired)
        );
      } else {
        console.warn(error);
      }
    }
  };

  assignStatus = (
    isExpired?: boolean,
    isLocked?: boolean,
    isEnabled?: boolean
  ): UserStatus => {
    const status = isExpired
      ? UserStatus.Expired
      : isLocked
      ? UserStatus.Locked
      : isEnabled
      ? UserStatus.Enabled
      : UserStatus.Disabled;
    return status;
  };
}

const user = new User();

export default user;
