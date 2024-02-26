import axios, { AxiosError, AxiosRequestConfig } from "axios";
import MockAdapter from "axios-mock-adapter";
import { MessageHelper } from "../../helpers/shared/MessageHelper";
import { AxiosHelper } from "./AxiosInstance";
import { ErrorMessage, StatusCode } from "../../helpers/api/RequestHelper";
import { i18nInstance } from "../../i18n";
import { UserPayload } from "src/helpers/token/TokenHelper";

describe("AxiosHelper", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("should add Authorization header to request with valid access token", async () => {
    const accessToken = "valid-access-token";
    localStorage.setItem("accessToken", accessToken);

    const requestConfig: AxiosRequestConfig = {
      url: "/api/some-endpoint",
      method: "get",
      headers: {
        Authorization: accessToken
      }
    };

    mockAxios.onGet("/api/some-endpoint").reply(200);

    await AxiosHelper.instance.request(requestConfig);

    expect(requestConfig.headers).toHaveProperty("Authorization", accessToken);
  });

  // Tests that a successful response is returned
  it("test_successful_response", async () => {
    const requestBody = {
      username: "test",
      password: "test"
    };

    const requestConfig: AxiosRequestConfig = {
      url: "/api/some-endpoint",
      method: "post",
      data: requestBody
    };

    mockAxios.onPost("/auth/login", requestBody).reply(200, {
      accessToken: "test",
      refreshToken: "test"
    });

    await AxiosHelper.instanceAuth.request(requestConfig);

    expect(requestConfig.data).toEqual({
      username: requestBody.username,
      password: requestBody.password
    });
  });
});
