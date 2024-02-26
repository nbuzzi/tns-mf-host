import { AuthService } from "../../service/auth/AuthService";
import { store } from "../StoreMobx";
import { TokenHelper } from "../../helpers/token/TokenHelper";
import { UserService } from "../../service/user/UserService";

describe("AuthStore", () => {
  // Tests that a successful login sets data, userDecoded, sessionId, and userInfo
  it("test_login_successful", async () => {
    const authService = store.auth;
    const user = { username: "test", password: "password" };
    const signInResponse = { accessToken: "accessToken", refreshToken: "refreshToken" };
    const userInfo = {
      username: "test",
      firstName: "Test",
      lastName: "User",
      email: "test.user@test.com",
      timeZone: "UTC",
      role: "BASIC"
    };
    AuthService.signIn = jest.fn().mockResolvedValue(signInResponse);
    TokenHelper.setUserInfoByToken = jest.fn().mockResolvedValue(userInfo);
    TokenHelper.validateExpiredToken = jest.fn();
    localStorage.setItem = jest.fn();
    await authService.login(user);
    expect(authService.data).toEqual(signInResponse);
    expect(authService.isLogged).toBe(true);
    expect(authService.userDecoded).toEqual(userInfo);
    expect(authService.sessionId).toBeDefined();
  });

  // Tests that a successful login calls validateExpiredToken
  it("test_login_validate_expired_token", async () => {
    const authService = store.auth;
    const user = { username: "test", password: "password" };
    const signInResponse = { accessToken: "accessToken", refreshToken: "refreshToken" };
    const userInfo = {
      username: "test",
      firstName: "Test",
      lastName: "User",
      email: "test.user@test.com",
      timeZone: "UTC",
      role: "BASIC"
    };
    AuthService.signIn = jest.fn().mockResolvedValue(signInResponse);
    TokenHelper.setUserInfoByToken = jest.fn().mockResolvedValue(userInfo);
    TokenHelper.validateExpiredToken = jest.fn();
    localStorage.setItem = jest.fn();
    await authService.login(user);
    expect(TokenHelper.validateExpiredToken).toHaveBeenCalledWith(signInResponse.accessToken, signInResponse.refreshToken);
  });

  // Tests that a successful actAs sets data, userDecoded, and isActAs
  it("test_act_as_successful", async () => {
    const authService = store.auth;
    const username = "test";
    const signInResponse = { accessToken: "accessToken", refreshToken: "refreshToken" };
    const userInfo = {
      username: "test",
      firstName: "Test",
      lastName: "User",
      email: "test.user@test.com",
      timeZone: "UTC",
      role: "BASIC"
    };
    UserService.actAs = jest.fn().mockResolvedValue({ data: signInResponse });
    TokenHelper.setUserInfoByToken = jest.fn().mockResolvedValue(userInfo);
    TokenHelper.validateExpiredToken = jest.fn();
    localStorage.setItem = jest.fn();
    await authService.actAs(username);
    expect(authService.data).toEqual(signInResponse);
    expect(authService.userDecoded).toEqual(userInfo);
    expect(authService.isActAs).toBe(true);
  });

  // Tests that a successful actAs calls validateExpiredToken
  it("test_act_as_validate_expired_token", async () => {
    const authService = store.auth;
    const username = "test";
    const signInResponse = { accessToken: "accessToken", refreshToken: "refreshToken" };
    const userInfo = {
      username: "test",
      firstName: "Test",
      lastName: "User",
      email: "test.user@test.com",
      timeZone: "UTC",
      role: "BASIC"
    };
    UserService.actAs = jest.fn().mockResolvedValue({ data: signInResponse });
    TokenHelper.setUserInfoByToken = jest.fn().mockResolvedValue(userInfo);
    TokenHelper.validateExpiredToken = jest.fn();
    localStorage.setItem = jest.fn();
    await authService.actAs(username);
    expect(TokenHelper.validateExpiredToken).toHaveBeenCalledWith(signInResponse.accessToken, signInResponse.refreshToken);
  });

  // Tests that a successful stopActAs sets userDecoded and isActAs
  it("test_stop_act_as_successful", async () => {
    const authService = store.auth;
    const accessToken = "accessToken";
    const refreshToken = "refreshToken";
    const userInfo = {
      username: "test",
      firstName: "Test",
      lastName: "User",
      email: "test.user@test.com",
      timeZone: "UTC",
      role: "BASIC"
    };
    TokenHelper.setUserInfoByToken = jest.fn().mockResolvedValue(userInfo);
    localStorage.setItem = jest.fn();
    localStorage.getItem = jest.fn().mockReturnValue(accessToken);
    await authService.stopActAs();
    expect(authService.userDecoded).toEqual(userInfo);
    expect(authService.isActAs).toBe(false);
  });
});
