import axios, { AxiosError, AxiosResponse } from 'axios';
import { i18nInstance as i18n } from '../../i18n';
import { API_URL_BASE } from '../environments';
import { MessageHelper } from '../../helpers/shared/MessageHelper';
import { ErrorMessage, StatusCode } from '../../helpers/api/RequestHelper';
import { TokenHelper } from '../../helpers/token/TokenHelper';
import { TRANSLATION } from '../../utils/const/translation';
export class AxiosHelper {
  static instance = axios.create({
    baseURL: `${API_URL_BASE}/`,
    headers: {
      'Content-type': 'application/json',
    },
  });
  /**
   *
   * Creates an instance of axios to handle authentication requests.
   * @type {import("axios").AxiosInstance}
   * @static
   * @readonly
   * @property {string} baseURL - The base URL for the authentication requests.
   * @property {Object} headers - The headers to be included in the authentication requests.
   * @property {string} headers.Content-type - The content type of the HTTP request.
   *
   */
  static instanceAuth = axios.create({
    baseURL: `${API_URL_BASE}/auth/`,
    headers: {
      'Content-type': 'application/json',
    },
  });
  /**
   *
   * Indicates if the token is currently active.
   * @static
   * @type {boolean}
   *
   */
  static isActiveToken = true;
}
AxiosHelper.instance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: any) => {
    if (config.headers) {
      if (AxiosHelper.isActiveToken) {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          return;
        }
        config.headers['Authorization'] = accessToken;
        return config;
      } else {
        setTimeout(() => {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            MessageHelper.errorMessage(
              i18n.t(TRANSLATION.MODAL.ALERT.sessionExpired)
            );
            return;
          }
          if (config.headers) {
            config.headers['Authorization'] = accessToken;
            return config;
          }
        }, 200);
      }
    } else {
      MessageHelper.errorMessage(
        i18n.t(TRANSLATION.MODAL.ALERT.sessionExpired)
      );
      localStorage.clear();
      window.location.reload();
    }
  },
  (error: AxiosError) => Promise.reject(error)
);
AxiosHelper.instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  // eslint-disable-next-line
  async (error: any) => {
    if (error.response) {
      if (error.response.status === StatusCode.UNAUTHORIZED) {
        if (error.response.data.error === ErrorMessage.BAD_ACCESS_TOKEN) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            AxiosHelper.isActiveToken = false;
            return TokenHelper.refreshTokenValidator(error, refreshToken);
          }
        }
        if (error.response.data.error === ErrorMessage.BAD_REFRESH_TOKEN) {
          MessageHelper.errorMessage(
            i18n.t(TRANSLATION.MODAL.ALERT.somethingWentWrong)
          );
          localStorage.clear();
          window.location.reload();
        }
        MessageHelper.errorMessage(
          i18n.t(TRANSLATION.MODAL.ALERT.somethingWentWrong)
        );
        localStorage.clear();
        window.location.reload();
      } else if (error.response.status === StatusCode.NOT_FOUND) {
        return Promise.resolve(error.response);
      } else {
        MessageHelper.errorMessage(
          i18n.t(TRANSLATION.MODAL.ALERT.coouldNotConnect)
        );
      }
    }
    return;
  }
);
AxiosHelper.instanceAuth.interceptors.response.use(
  (response: AxiosResponse) => response,
  // eslint-disable-next-line
  async (error: any) => {
    if (error.response) {
      if (error.response.status === StatusCode.UNAUTHORIZED) {
        if (error.response.data.error === ErrorMessage.BAD_REFRESH_TOKEN) {
          MessageHelper.errorMessage(
            i18n.t(TRANSLATION.MODAL.ALERT.somethingWentWrong)
          );
          localStorage.clear();
          window.location.reload();
        }
        MessageHelper.errorMessage(
          i18n.t(TRANSLATION.MODAL.ALERT.somethingWentWrong)
        );
        localStorage.clear();
        window.location.reload();
      } else {
        MessageHelper.errorMessage(
          i18n.t(TRANSLATION.MODAL.ALERT.coouldNotConnect)
        );
      }
    }
    return;
  }
);
