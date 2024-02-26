import axios, { AxiosError } from "axios";
import { User } from "../../interfaces/auth/login/login";
import { AuthService } from "../../service/auth/AuthService";
import { TokenHelper } from "./TokenHelper";
import { RefreshResponse } from "src/interfaces/auth/response/response";

describe("TokenHelper", () => {
  // Tests that a successful sign in returns user or sign in response and displays success message
  it("test_set_user_info", async () => {
    const user = await TokenHelper.setUserInfoByToken(
      "eyJhbGciOiJIUzUxMiJ9.eyJmaXJzdE5hbWUiOiJFbnJpYyIsImxhc3ROYW1lIjoiVm95ZSIsInN1YiI6ImV2b3llX2FkbWluIiwiYWNuYXNMaXN0IjpbImFzaSIsImJtbCIsImNtbCIsInZsciIsImh5byIsImVmdHgiLCJsYXBvIl0sInJvbGUiOiJBRE1JTiIsInRpbWVab25lIjoiRXVyb3BlL0J1c2luZ2VuIiwiZXhwIjoxNjg3OTkzMzkyLCJ1c2VySWQiOjEsImlhdCI6MTY4Nzk5MjE5MiwiZW1haWwiOiJldm95ZUB0bnNpLmNvbSJ9.zIQy1njy797Gfe4SxzGfMFFwyX0r767mLpsS8GHlkTbJ4z0uTexey-NBhSEQAIF1PKknpNV95GUs669QlCIo1g"
    );
    expect(user).toEqual({
      username: "evoye_admin",
      firstName: "Enric",
      lastName: "Voye",
      email: "evoye@tnsi.com",
      timeZone: "Europe/Busingen",
      role: "ADMIN"
    });
  });

  // Tests that refreshTokenValidator returns undefined when AuthService.refreshToken returns undefined
  it("test_refresh_token_validator_returns_undefined_with_undefined_refresh_token", async () => {
    const error = {
      config: {
        headers: {}
      }
    } as AxiosError;

    const refreshToken = "oldRefreshToken";
    const updatedToken = undefined;

    const authServiceRefreshTokenSpy = jest.spyOn(AuthService, "refreshToken").mockResolvedValue(updatedToken);
    const axiosRequestSpy = jest.spyOn(axios, "request").mockResolvedValue({} as any);

    const result = await TokenHelper.refreshTokenValidator(error, refreshToken);

    expect(result).toBeUndefined();

    authServiceRefreshTokenSpy.mockRestore();
    axiosRequestSpy.mockRestore();
  });

  // Tests that refreshTokenValidator returns updated access token and refresh token when called with valid parameters
  it("test_refresh_token_validator_returns_updated_tokens", async () => {
    const error = {
      config: {
        headers: {}
      }
    } as AxiosError;

    const refreshToken = "oldRefreshToken";
    const updatedToken = {
      accessToken: "newAccessToken",
      refreshToken: "newRefreshToken"
    } as RefreshResponse;

    const authServiceRefreshTokenSpy = jest.spyOn(AuthService, "refreshToken").mockResolvedValue(updatedToken);
    const axiosRequestSpy = jest.spyOn(axios, "request").mockResolvedValue({} as any);

    const result = await TokenHelper.refreshTokenValidator(error, refreshToken);

    expect(result).toBeDefined();
    expect(localStorage.getItem("accessToken")).toEqual(updatedToken.accessToken);
    expect(localStorage.getItem("refreshToken")).toEqual(updatedToken.refreshToken);

    authServiceRefreshTokenSpy.mockRestore();
    axiosRequestSpy.mockRestore();
  });

  // Tests that validateExpiredToken returns undefined when AuthService.refreshToken returns undefined
  it("test_validate_expired_token", async () => {
    const tokens = {
      accessToken: "oldAccessToken",
      refreshToken: "oldRefreshToken"
    };

    const refreshToken = "oldRefreshToken";
    const updatedToken = {
      accessToken: "newAccessToken",
      refreshToken: "newRefreshToken"
    } as RefreshResponse;

    const authServiceRefreshTokenSpy = jest.spyOn(AuthService, "refreshToken").mockResolvedValue(updatedToken);
    const axiosRequestSpy = jest.spyOn(axios, "request").mockResolvedValue({} as any);

    const result = await TokenHelper.validateExpiredToken(tokens.accessToken, tokens.refreshToken);

    expect(result).toBeUndefined();

    authServiceRefreshTokenSpy.mockRestore();
    axiosRequestSpy.mockRestore();
  });
});
