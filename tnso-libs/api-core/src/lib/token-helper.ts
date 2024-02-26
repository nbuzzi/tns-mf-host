import axios, { AxiosError } from 'axios';
import { IRefreshResponse } from './models/response.model';

export interface UserPayload {
  sub: string;
  firstName: string;
  lastName: string;
  email: string;
  timeZone: string;
  role: string;
  companyProfilesList: string[];
}
export class TokenHelper {
  public static urlToRefresh = '/refreshtoken';

  public static async refreshTokenValidator(
    error: AxiosError,
    refreshToken: string
  ): Promise<void> {
    const config = error.config;

    const response = (await axios.post(
      this.urlToRefresh,
      refreshToken
    )) as IRefreshResponse;
    if (!response) {
      return;
    }

    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    if (config && config.headers) {
      config.headers['Authorization'] = response.accessToken;
      return axios.request(config);
    }
  }

  public static setUrlToRefresh(url: string): void {
    this.urlToRefresh = url;
  }
}
