export interface SignInResponse {
  accessToken: string;
  token: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken {
  refreshToken: string;
}

