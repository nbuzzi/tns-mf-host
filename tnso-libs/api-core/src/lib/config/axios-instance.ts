import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorMessage, StatusCode } from '../models/api-core.model';
import { TokenHelper } from '../token-helper';

export class ApiInstance {
  public static isActiveToken = true;
  public static instance = axios.create({
    headers: {
      'Content-type': 'application/json',
    },
  });

  public static instanceAuth = axios.create({
    headers: {
      'Content-type': 'application/json',
    },
  });
}

ApiInstance.instance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: any) => {
    if (config.headers) {
      if (ApiInstance.isActiveToken) {
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
            console.warn('Session expired');
            return;
          }
          if (config.headers) {
            config.headers['Authorization'] = accessToken;
            return config;
          }
        }, 200);
      }
    } else {
      console.warn('Session expired');
      localStorage.clear();
      window.location.reload();
    }
  },
  (error: AxiosError) => Promise.reject(error)
);

ApiInstance.instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  // eslint-disable-next-line
  async (error: any) => {
    if (error.response) {
      if (error.response.status === StatusCode.UNAUTHORIZED) {
        if (error.response.data.error === ErrorMessage.BAD_ACCESS_TOKEN) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            ApiInstance.isActiveToken = false;
            return TokenHelper.refreshTokenValidator(error, refreshToken);
          }
        }
        if (error.response.data.error === ErrorMessage.BAD_REFRESH_TOKEN) {
          console.warn("Something's wrong with refresh token");
          localStorage.clear();
          window.location.reload();
        }
        console.warn("Something's wrong with access token");
        localStorage.clear();
        window.location.reload();
      } else if (error.response.status === StatusCode.NOT_FOUND) {
        return Promise.resolve(error.response);
      } else {
        console.warn('Something went wrong');
      }
    }
    return;
  }
);

ApiInstance.instanceAuth.interceptors.response.use(
  (response: AxiosResponse) => response,
  // eslint-disable-next-line
  async (error: any) => {
    if (error.response) {
      if (error.response.status === StatusCode.UNAUTHORIZED) {
        if (error.response.data.error === ErrorMessage.BAD_REFRESH_TOKEN) {
          console.warn("Something's wrong with refresh token");
          localStorage.clear();
          window.location.reload();
        }
        console.warn("Something's wrong with access token");
        localStorage.clear();
        window.location.reload();
      } else {
        console.warn('Something went wrong');
      }
    }
    return;
  }
);
