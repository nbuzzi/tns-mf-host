import { API_URL_BASE } from "../../config/environments";
import { i18nInstance as i18n } from "../../i18n";
import { auth, ErrorMessage, refresh, StatusCode } from "../../helpers/api/RequestHelper";
import { MessageHelper } from "../../helpers/shared/MessageHelper";
import { User } from "../../interfaces/auth/login/login";
import { RefreshResponse, RefreshToken, SignInResponse } from "../../interfaces/auth/response/response";
import { ErrorHelper } from "../../helpers/shared/ErrorHelper";
import { TRANSLATION } from "../../utils/const/translation";

export class AuthService {
  static async signIn(user: User): Promise<User | SignInResponse | undefined> {
    try {
      const response = await auth<User | SignInResponse>(`${API_URL_BASE}/authenticate`, user);
      if (response?.status === StatusCode.OK || response?.status === StatusCode.CREATED || response?.status === StatusCode.NO_CONTENT) {
        MessageHelper.successMessage(i18n.t(TRANSLATION.MODAL.ALERT.loginSuccess));
      }
      return response?.data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedError = error as any;
      // error 400
      if (parsedError.response?.status === StatusCode.BAD_REQUEST) {
        MessageHelper.errorMessage(ErrorHelper.login.badRequest);
      }
      // error 403
      if (parsedError.response?.status === StatusCode.FORBIDDEN) {
        if (parsedError.response.data.error === ErrorMessage.ACCOUNT_LOCKED) {
          window.location.assign("/auth/userLocked");
        } else if (parsedError.response.data.error === ErrorMessage.ACCOUNT_DISABLED) {
          window.location.assign("/auth/userDisabled");
        } else if (parsedError.response.data.error === ErrorMessage.ACCOUNT_EXPIRED) {
          MessageHelper.errorMessage(ErrorHelper.login.accountExpired);
        }
      }
      // error 404
      if (parsedError.response?.status === StatusCode.NOT_FOUND) {
        console.warn(ErrorHelper.login.userNotFound);
        MessageHelper.errorMessage(ErrorHelper.login.userNotFound);
      }
      // error 500
      if (parsedError.response?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        MessageHelper.errorMessage(ErrorHelper.login.internalServerError);
      }
    }
  }

  static async refreshToken(refreshToken: RefreshToken): Promise<RefreshResponse | RefreshToken | undefined> {
    try {
      const response = await refresh<RefreshResponse | RefreshToken>(`${API_URL_BASE}/authenticate/refreshToken`, refreshToken);
      return response?.data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedError = error as any;
      // error 400
      if (parsedError.response?.status === StatusCode.BAD_REQUEST) {
        MessageHelper.errorMessage(ErrorHelper.login.badRequest);
      }
      // error 401
      if (parsedError.response?.status === StatusCode.UNAUTHORIZED) {
        if (parsedError.response.data.error === ErrorMessage.BAD_REFRESH_TOKEN) {
          MessageHelper.errorMessage(ErrorHelper.login.badRefreshToken);
        }
      }
      // error 404
      if (parsedError.response?.status === StatusCode.NOT_FOUND) {
        MessageHelper.errorMessage(ErrorHelper.login.userNotFound);
      }
      // error 500
      if (parsedError.response?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        MessageHelper.errorMessage(ErrorHelper.login.internalServerError);
      }
    }
  }
}
