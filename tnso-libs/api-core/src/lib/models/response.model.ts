import { StatusCode } from "./api-core.model";

export interface ISignInResponse {
  accessToken: string;
  token: string;
  refreshToken: string;
}

export interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshToken {
  refreshToken: string;
}

// eslint-disable-next-line
export interface IResponse<T = any> {
  data?: T;
  status?: StatusCode;
}
