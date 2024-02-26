import { AxiosResponse } from 'axios';
import { API_URL_BASE } from '../../config/environments';
import {
  ErrorMessage,
  StatusCode,
  encodeParams,
} from '../../helpers/api/RequestHelper';
import { ActAsPayload } from '../../interfaces/auth/login/login';
import { SignInResponse } from '../../interfaces/auth/response/response';
import { RolesByUserList } from '../../interfaces/auth/roleAndPermission/role';
import { QueryParams } from '../../interfaces/shared/queryParams';
import {
  AvailableByEmail,
  AvailableByUsername,
  User,
  UserAlternative,
  UserResponse,
} from '../../interfaces/users/user';
import { BaseService } from '../BaseService';
import { sendPost, sendPatch } from '../../helpers/api/RequestHelper';
import { Response } from '../../interfaces/api/api';
import { ErrorHelper } from '../../helpers/shared/ErrorHelper';
import { MessageHelper } from '../../helpers/shared/MessageHelper';
import { TRANSLATION } from '../../../src/utils/const/translation';
import { i18nInstance as i18n } from '../../i18n';

export class UserService extends BaseService {
  static async getAll(
    params?: QueryParams
  ): Promise<Response<UserResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>(params as QueryParams);
    return this.get<UserResponse>('users', urlSearchParams);
  }

  static async getByUsername(
    username: string
  ): Promise<Response<UserResponse> | undefined> {
    const urlSearchParams = encodeParams<QueryParams>({ username });
    return this.get<UserResponse>('users', urlSearchParams);
  }

  static async isAvailableByEmail(
    email: string
  ): Promise<Response<AvailableByEmail> | undefined> {
    return this.get<AvailableByEmail>(
      `users/email/${encodeURIComponent(email)}/available`
    );
  }

  static async isAvailableByUsername(
    username: string
  ): Promise<Response<AvailableByUsername> | undefined> {
    return this.get<AvailableByUsername>(
      `users/username/${encodeURIComponent(username)}/available`
    );
  }

  static async createByRole(
    role: RolesByUserList,
    user: User
  ): Promise<Response | undefined> {
    return this.post<User>(`users/${role}`, user);
  }
  // UserALternative must be removed when the new logic for credentialsExpires is done
  static async updateByRole(
    role: RolesByUserList,
    user: User | UserAlternative,
    username: string
  ): Promise<Response | undefined> {
    return this.patch<User | UserAlternative>(
      `users/${role}/${username}`,
      user
    );
  }

  static async updateOwnProfile(
    user: UserAlternative
  ): Promise<Response | undefined> {
    return this.patch<UserAlternative>('users/profile', user);
  }

  static async actAs(
    username: ActAsPayload
  ): Promise<Response<ActAsPayload | SignInResponse> | undefined> {
    return this.post<SignInResponse | ActAsPayload>('users/actas', username);
  }

  static async forgotPassword(
    email: string
  ): Promise<AxiosResponse | Record<string, string> | undefined> {
    try {
      const response = await sendPost<Record<string, string>>(
        `${API_URL_BASE}/users/password/forgot`,
        { email }
      );
      if (
        response?.status !== StatusCode.OK &&
        response?.status !== StatusCode.NO_CONTENT &&
        response?.status !== StatusCode.CREATED
      ) {
        console.warn(i18n.t(TRANSLATION.ERROR.upsSomethingWentWrong));
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  static async resetPassword(
    password: string,
    guid: string
  ): Promise<string | AxiosResponse | void> {
    try {
      const response = await sendPatch<AxiosResponse | Record<string, string>>(
        `${API_URL_BASE}/users/password/${guid}`,
        { password }
      );
      if (
        response?.status !== StatusCode.OK &&
        response?.status !== StatusCode.NO_CONTENT &&
        response?.status !== StatusCode.CREATED
      ) {
        console.warn(i18n.t(TRANSLATION.ERROR.upsSomethingWentWrong));
      }
      return response;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedError = error as any;
      if (parsedError.response?.status === StatusCode.BAD_REQUEST) {
        if (
          parsedError.response?.data?.error ===
          ErrorMessage.RECENT_PASSWORDS_MATCH
        ) {
          MessageHelper.errorMessage(ErrorHelper.password.recentPasswordMatch);
        }
        if (
          parsedError.response?.data?.error ===
          ErrorMessage.PASSWORD_COMPLEXITY_DOES_NOT_MATCH
        ) {
          MessageHelper.errorMessage(ErrorHelper.password.passwordComplexity);
        }
        if (
          parsedError.response?.data?.error ===
          ErrorMessage.PASSWORD_CONTAINS_USERNAME
        ) {
          MessageHelper.errorMessage(
            ErrorHelper.password.passwordContainsUsername
          );
        }
        if (
          parsedError.response?.data?.error ===
          ErrorMessage.PASSWORD_MIN_LENGTH_DOES_NOT_MATCH
        ) {
          MessageHelper.errorMessage(ErrorHelper.password.passwordMinLength);
        }
        if (
          parsedError.response?.data?.error ===
          ErrorMessage.BAD_RESET_PASSWORD_TOKEN
        ) {
          MessageHelper.errorMessage(
            ErrorHelper.password.badResetPasswordToken
          );
        }
      } else {
        MessageHelper.errorMessage(
          i18n.t(TRANSLATION.ERROR.errorResettingPassword)
        );
      }
    }
  }
}
