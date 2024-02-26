import { ErrorMessage, StatusCode } from "../../helpers/api/RequestHelper";
import { RolesByUserList } from "../../interfaces/auth/roleAndPermission/role";
import { UserService } from "./UserService";
import { API_URL_BASE } from "../../config/environments";
import { MessageHelper } from "../../helpers/shared/MessageHelper";

describe("UserService", () => {
  it("should be undefined", async () => {
    const response = await UserService.getAll();

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await UserService.getByUsername("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await UserService.isAvailableByEmail("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await UserService.isAvailableByUsername("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await UserService.createByRole(RolesByUserList.Admin, {
      email: "mock",
      username: "mock",
      firstName: "mock",
      lastName: "mock",
      accountLocked: false,
      companyProfiles: [],
      role: RolesByUserList.Admin,
      credentialsExpired: false,
      enabled: true,
      lastLogin: "",
      timeZone: ""
    });

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await UserService.updateByRole(
      RolesByUserList.Admin,
      {
        email: "mock",
        username: "mock",
        firstName: "mock",
        lastName: "mock",
        accountLocked: false,
        companyProfiles: [],
        role: RolesByUserList.Admin,
        credentialsExpired: false,
        enabled: true,
        lastLogin: "",
        timeZone: ""
      },
      "mock"
    );

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await UserService.updateOwnProfile({
      email: "mock",
      username: "mock",
      firstName: "mock",
      lastName: "mock",
      accountLocked: false,
      companyProfiles: [],
      role: RolesByUserList.Admin,
      credentialsExpired: false,
      enabled: true,
      lastLogin: "",
      timeZone: ""
    });

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await UserService.actAs({ username: "asdsad" });

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await UserService.forgotPassword("mock");

    expect(response).toEqual(undefined);
  });

  it("should be undefined", async () => {
    const response = await UserService.resetPassword("mock", "mock");

    expect(response).toEqual(undefined);
  });

  it("should throw error when invalid password and guid are provided", async () => {
    // Arrange
    const password = "newPassword";
    const guid = "1234567890";
    // Act
    const response = await UserService.resetPassword(password, guid);
    // Assert
    expect(response).toBeUndefined();
  });
});
