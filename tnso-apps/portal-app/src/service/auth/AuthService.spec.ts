import { AuthService } from "./AuthService";

describe("AuthService", () => {
  it("should call get method with response undefined", async () => {
    const response = await AuthService.signIn({
      username: "username",
      password: "password"
    });

    expect(response).toEqual(undefined);
  });

  it("should call get method with response undefined", async () => {
    const response = await AuthService.refreshToken({
      refreshToken: "refreshToken"
    });

    expect(response).toEqual(undefined);
  });

  it("should handle a successful sign-in", async () => {
    const userData = {
      username: "validUsername",
      password: "validPassword"
    };
    const response = await AuthService.signIn(userData);
    expect(response).toBeUndefined();
  });

  it("should handle a locked account during sign-in", async () => {
    const lockedAccountData = {
      username: "lockedAccount",
      password: "validPassword"
    };
    const response = await AuthService.signIn(lockedAccountData);
    expect(response).toBeUndefined();
  });

  it("should handle a bad request error during sign-in", async () => {
    const invalidUserData = {
      username: "invalidUsername",
      password: "invalidPassword"
    };
    const response = await AuthService.signIn(invalidUserData);
    expect(response).toBeUndefined();
  });

  it("should handle a bad refresh token error during token refresh", async () => {
    const invalidRefreshTokenData = {
      refreshToken: "invalidRefreshToken"
    };
    const response = await AuthService.refreshToken(invalidRefreshTokenData);
    expect(response).toBeUndefined();
  });
});
