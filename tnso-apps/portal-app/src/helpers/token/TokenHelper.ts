import axios, { AxiosError } from 'axios';
import { AuthService } from '../../service/auth/AuthService';
import { RefreshResponse } from '../../interfaces/auth/response/response';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { AxiosHelper } from '../../config/api/AxiosInstance';
import { UserInfo } from '../../interfaces/auth/login/login';
import { Roles } from 'interfaces/auth/roleAndPermission/role';

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
  static async refreshTokenValidator(
    error: AxiosError,
    refreshToken: string
  ): Promise<void> {
    const refresh = localStorage.getItem('refreshToken') || refreshToken;
    const config = error.config;

    const updatedToken = await AuthService.refreshToken({
      refreshToken: refresh,
    });
    if (!updatedToken) {
      return;
    }
    const response = updatedToken as RefreshResponse;

    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    if (config && config.headers) {
      config.headers['Authorization'] = response.accessToken;
      return axios.request(config);
    }
  }

  static async setUserInfoByToken(
    accessToken: string
  ): Promise<UserInfo | undefined> {
    const tokenDecoded: UserPayload | undefined =
      jwtDecode<UserPayload>(accessToken);
    if (tokenDecoded && tokenDecoded.sub) {
      return {
        username: tokenDecoded.sub,
        firstName: tokenDecoded.firstName,
        lastName: tokenDecoded.lastName,
        email: tokenDecoded.email,
        timeZone: tokenDecoded.timeZone,
        role: tokenDecoded.role as Roles,
        companyProfilesList: tokenDecoded.companyProfilesList,
      };
    }
    return undefined;
  }

  static async validateExpiredToken(
    accessToken: string,
    refreshToken: string
  ): Promise<void> {
    const id = setInterval(async () => {
      if (AxiosHelper.isActiveToken) {
        const dateNow = new Date().getTime();
        const tokenDecoded: JwtPayload | undefined =
          jwtDecode<JwtPayload>(accessToken);
        if (tokenDecoded && tokenDecoded.exp) {
          const tokenExpire =
            new Date(tokenDecoded.exp * 1000).getTime() - 2000;
          if (tokenExpire < dateNow) {
            AxiosHelper.isActiveToken = false;
            const updatedToken = await AuthService.refreshToken({
              refreshToken,
            });
            if (!updatedToken) {
              clearInterval(id);
              AxiosHelper.isActiveToken = true;
            } else {
              const response = updatedToken as RefreshResponse;

              localStorage.setItem('accessToken', response.accessToken);
              localStorage.setItem('refreshToken', response.refreshToken);
              AxiosHelper.isActiveToken = true;
              clearInterval(id);
              await this.validateExpiredToken(
                response.accessToken,
                response.refreshToken
              );
            }
          }
        }
      }
    }, 1000);
  }
}
