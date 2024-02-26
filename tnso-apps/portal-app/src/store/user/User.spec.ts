import { UserService } from "../../service/user/UserService";
import { store } from "../StoreMobx";
import { StatusCode } from "../../helpers/api/RequestHelper";
import { RolesByUserList } from "../../interfaces/auth/roleAndPermission/role";
import { User, UserResponse, UserStatus } from "../../interfaces/users/user";
import { MessageHelper } from "../../helpers/shared/MessageHelper";
import { handleModal } from "./tableConfig";

describe("User", () => {
  // Tests that loadData does not set data property when response is unsuccessful
  it("test_load_data_failure", async () => {
    UserService.getAll = jest.fn().mockRejectedValue(new Error("Error loading users"));
    const user = store.user;
    await user.loadData();
    expect(user.data).toBeUndefined();
  });

  // Tests that loadData sets data property when response is successful
  it("test_load_data_success", async () => {
    const mockResponse = {
      data: {
        totalRecords: 1,
        recordsPerPage: 10,
        users: [
          {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            status: "Disabled"
          }
        ]
      }
    };
    UserService.getAll = jest.fn().mockResolvedValue(mockResponse);
    const user = store.user;
    await user.loadData();
    expect(user.data).toEqual(mockResponse.data);
  });

  // Tests that loadUserByUsername does not set userSelected property when response is unsuccessful
  it("test_load_user_by_username_failure", async () => {
    UserService.getByUsername = jest.fn().mockRejectedValue(new Error("Error loading user"));
    const user = store.user;
    await user.loadUserByUsername("johndoe");
    expect(user.userSelected).toBeUndefined();
  });

  // Tests that loadUserByUsername sets userSelected property when response is successful
  it("test_load_user_by_username_success", async () => {
    const mockResponse = {
      data: {
        totalRecords: 1,
        recordsPerPage: 10,
        users: [
          {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com"
          }
        ]
      }
    };
    UserService.getByUsername = jest.fn().mockResolvedValue(mockResponse);
    const user = store.user;
    await user.loadUserByUsername("johndoe");
    expect(user.userSelected).toEqual(mockResponse.data.users[0]);
  });

  // Tests that createByRole calls loadAvailablesByUser and loadAssociatedByUser when user has a username and calls loadData after creating a user
  it("test_create_by_role_success", async () => {
    const mockResponse = {
      status: StatusCode.NO_CONTENT
    };
    UserService.createByRole = jest.fn().mockResolvedValue(mockResponse);
    store.companyProfile.loadAvailablesByUser = jest.fn();
    store.companyProfile.loadAssociatedByUser = jest.fn();
    const user = store.user;
    user.prevParams = {};
    await user.createByRole(RolesByUserList.Basic, {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      username: "johndoe"
    });
    expect(UserService.getAll).toHaveBeenCalledWith(user.prevParams);
  });

  // Tests that createByRole does not call loadAvailablesByUser, loadAssociatedByUser, or loadData when response is unsuccessful
  it("test_create_by_role_failure", async () => {
    const mockResponse = {
      status: StatusCode.BAD_REQUEST
    };
    UserService.createByRole = jest.fn().mockResolvedValue(mockResponse);
    store.companyProfile.loadAvailablesByUser = jest.fn();
    store.companyProfile.loadAssociatedByUser = jest.fn();
    const user = store.user;
    user.prevParams = {};
    await user.createByRole(RolesByUserList.Basic, {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com"
    });
    expect(UserService.getAll).toHaveBeenCalledTimes(3);
  });

  // Tests that isAvailableByEmail returns the expected response
  it("test_is_available_by_email_success", async () => {
    const user = store.user;
    const email = "test@test.com";
    const expectedResponse = { available: true };
    jest.spyOn(UserService, "isAvailableByEmail").mockResolvedValueOnce({ data: expectedResponse });
    const response = await user.isAvailableByEmail(email);
    expect(response).toEqual(expectedResponse);
  });

  // Tests that isAvailableByUsername returns the expected response
  it("test_is_available_by_username_success", async () => {
    const user = store.user;
    const username = "test";
    const expectedResponse = { available: true };
    jest.spyOn(UserService, "isAvailableByUsername").mockResolvedValueOnce({ data: expectedResponse });
    const response = await user.isAvailableByUsername(username);
    expect(response).toEqual(expectedResponse);
  });

  // Tests that setUser updates the userSelected property
  it("test_set_user_success", () => {
    const user = store.user;
    const userSelected: User = {
      username: "test",
      email: "test@test.com",
      firstName: "test",
      lastName: "test",
      accountLocked: false,
      companyProfiles: [],
      credentialsExpired: false,
      role: RolesByUserList.Basic,
      enabled: true,
      lastLogin: "1255458",
      timeZone: "America/Los_Angeles"
    };
    user.setUser(userSelected);
    expect(user.userSelected).toEqual(userSelected);
  });

  it("should update own user successfully", async () => {
    const user = store.user;
    const successfulUpdate = await user.updateOwnUser({ username: "test", email: "test@test.com", firstName: "test", lastName: "test" });
    expect(successfulUpdate).toBe(false);
  });

  it("should clean user data", () => {
    const user = store.user;
    user.cleanUser();
    expect(user.userSelected).toBeUndefined();
    expect(user.data).toBeUndefined();
  });

  it("should assign status correctly", () => {
    const user = store.user;

    // Test all possible combinations of isExpired, isLocked, and isEnabled
    const expiredLockedEnabled = user.assignStatus(true, true);
    const expiredLockedDisabled = user.assignStatus(true, true);
    const expiredUnlockedEnabled = user.assignStatus(true, false);
    const expiredUnlockedDisabled = user.assignStatus(true, false);
    const notExpiredLockedEnabled = user.assignStatus(false, true);
    const notExpiredLockedDisabled = user.assignStatus(false, true);
    const notExpiredUnlockedEnabled = user.assignStatus(false, false);
    const notExpiredUnlockedDisabled = user.assignStatus(false, false);

    // Add assertions for each case to ensure the correct status is assigned
    expect(expiredLockedEnabled).toBe(UserStatus.Expired);
    expect(expiredLockedDisabled).toBe(UserStatus.Expired);
    expect(expiredUnlockedEnabled).toBe(UserStatus.Expired);
    expect(expiredUnlockedDisabled).toBe(UserStatus.Expired);
    expect(notExpiredLockedEnabled).toBe(UserStatus.Locked);
    expect(notExpiredLockedDisabled).toBe(UserStatus.Locked);
    expect(notExpiredUnlockedEnabled).toBe(UserStatus.Disabled);
    expect(notExpiredUnlockedDisabled).toBe(UserStatus.Disabled);
  });

  it("should handle reset password failure", async () => {
    const user = store.user;
    const password = "newPassword";
    const guid = "testGuid";
    await user.resetPassword(password, guid);
    expect(user.userSelected).toBeUndefined();
  });

  it("should set company profiles successfully", () => {
    const user = store.user;
    user.setUser({
      username: "test",
      email: "test@test.com",
      firstName: "test",
      lastName: "test",
      accountLocked: false,
      companyProfiles: [],
      credentialsExpired: false,
      role: RolesByUserList.Basic,
      enabled: true,
      lastLogin: "1255458",
      timeZone: "America/Los_Angeles"
    });
    const companyProfiles = "Profile1,Profile2";
    user.setCompanyProfiles(companyProfiles);
    expect(user.userSelected?.companyProfiles).toBe(companyProfiles);
  }, 10000);

  it("should handle forgot password success", async () => {
    const user = store.user;
    const email = "test@example.com";
    await user.forgotPassword(email);
  });

  it("should handle forgot password failure", async () => {
    const user = store.user;
    const email = "test@example.com";
    await user.forgotPassword(email);
  });

  it("should handle reset password success", async () => {
    const user = store.user;
    const password = "newPassword";
    const guid = "testGuid";
    await user.resetPassword(password, guid);
  });

  it("should handle reset password token expiration", async () => {
    const user = store.user;
    const password = "newPassword";
    const guid = "expiredToken";
    await user.resetPassword(password, guid);
  });

  it("should update own user successfully", async () => {
    const user = store.user;
    const userToUpdate = {
      username: "test",
      email: "test@test.com",
      firstName: "test",
      lastName: "test"
    };
    const successfulUpdate = await user.updateOwnUser(userToUpdate);
    expect(successfulUpdate).toBe(false);
  });

  it("should update own user and handle failure", async () => {
    const user = store.user;
    const userToUpdate = {
      username: "test",
      email: "test@test.com",
      firstName: "test",
      lastName: "test"
    };
    const unsuccessfulUpdate = await user.updateOwnUser(userToUpdate);
    expect(unsuccessfulUpdate).toBeFalsy();
  });

  it("should set user enabled successfully", () => {
    const user = store.user;
    user.setUser({
      username: "test",
      email: "test@test.com",
      firstName: "test",
      lastName: "test",
      accountLocked: false,
      companyProfiles: [],
      credentialsExpired: false,
      role: RolesByUserList.Basic,
      enabled: false,
      lastLogin: "1255458",
      timeZone: "America/Los_Angeles"
    });
    const enabled = true;
    user.setUserEnabled(enabled);
    expect(user.userSelected?.enabled).toBe(enabled);
  });

  it("should set user disabled successfully", () => {
    const user = store.user;
    user.setUser({
      username: "test",
      email: "test@test.com",
      firstName: "test",
      lastName: "test",
      accountLocked: false,
      companyProfiles: [],
      credentialsExpired: false,
      role: RolesByUserList.Basic,
      enabled: true,
      lastLogin: "1255458",
      timeZone: "America/Los_Angeles"
    });
    const enabled = false;
    user.setUserEnabled(enabled);
    expect(user.userSelected?.enabled).toBe(enabled);
  });

  it("should handle update user by role failure", async () => {
    const user = store.user;
    const role = RolesByUserList.Basic;
    const userToUpdate = {
      username: "test",
      email: "test@test.com",
      firstName: "test",
      lastName: "test"
    };
    const username = "testUsername";

    jest.spyOn(UserService, "updateByRole").mockRejectedValueOnce(new Error("Error updating user"));
    jest.spyOn(MessageHelper, "errorMessage");

    await user.updateByRole(role, userToUpdate, username);
    expect(UserService.updateByRole).toHaveBeenCalledWith(role.toLowerCase(), userToUpdate, username);
    expect(MessageHelper.errorMessage).toHaveBeenCalledWith("Error updating user");
  });

  it("should update user by role successfully", async () => {
    const user = store.user;
    const role = RolesByUserList.Basic;
    const userToUpdate = {
      username: "test",
      email: "test@test.com",
      firstName: "test",
      lastName: "test"
    };
    const username = "testUsername";

    const mockUpdateResult = {
      status: StatusCode.NO_CONTENT
    };
    jest.spyOn(UserService, "updateByRole").mockResolvedValueOnce(mockUpdateResult);
    jest.spyOn(MessageHelper, "successMessage");

    await user.updateByRole(role, userToUpdate, username);
    expect(UserService.updateByRole).toHaveBeenCalledWith(role.toLowerCase(), userToUpdate, username);
    expect(MessageHelper.successMessage).toHaveBeenCalledWith("User updated successfully");
  });

  it("should handle create user by role failure", async () => {
    const role = RolesByUserList.Basic;
    const user = store.user;
    const userToCreate = {
      username: "test",
      email: "test@test.com",
      firstName: "test",
      lastName: "test"
    };

    jest.spyOn(UserService, "createByRole").mockRejectedValueOnce(new Error("Error creating user"));
    jest.spyOn(MessageHelper, "errorMessage");

    await user.createByRole(role, userToCreate);
    expect(UserService.createByRole).toHaveBeenCalledWith(role.toLowerCase(), userToCreate);
    expect(MessageHelper.errorMessage).toHaveBeenCalledWith("Error creating user");
  });

  it("should handle update own user failure", async () => {
    const user = store.user;
    const userToUpdate = {
      username: "test",
      email: "test@test.com",
      firstName: "test",
      lastName: "test"
    };

    jest.spyOn(UserService, "updateOwnProfile").mockRejectedValueOnce(new Error("Error updating user"));
    jest.spyOn(MessageHelper, "errorMessage");

    const localStorageSetItemMock = jest.fn();
    const localStorageGetItemMock = jest.fn().mockReturnValue(
      JSON.stringify({
        username: "test",
        email: "test@test.com",
        firstName: "test",
        lastName: "test"
      })
    );
    global.localStorage.setItem = localStorageSetItemMock;
    global.localStorage.getItem = localStorageGetItemMock;

    const unsuccessfulUpdate = await user.updateOwnUser(userToUpdate);

    expect(UserService.updateOwnProfile).toHaveBeenCalledWith(userToUpdate);
    expect(MessageHelper.errorMessage).toHaveBeenCalledWith("Error updating user");
    expect(localStorageSetItemMock).not.toHaveBeenCalled();
    expect(unsuccessfulUpdate).toBe(false);
  });

  it("should handle email availability check failure", async () => {
    const user = store.user;
    const testEmail = "test@example.com";

    jest.spyOn(UserService, "isAvailableByEmail").mockRejectedValueOnce(new Error("Error checking email"));
    jest.spyOn(MessageHelper, "errorMessage");

    const response = await user.isAvailableByEmail(testEmail);

    expect(UserService.isAvailableByEmail).toHaveBeenCalledWith(testEmail);
    expect(MessageHelper.errorMessage).toHaveBeenCalledWith("Error checking email");
    expect(response).toBeUndefined();
  });

  it("should send a password reset email successfully", async () => {
    const user = store.user;
    const testEmail = "test@example.com";

    const mockResult = {
      data: undefined,
      status: StatusCode.NO_CONTENT
    };

    jest.spyOn(UserService, "forgotPassword").mockResolvedValueOnce(mockResult as any);
    jest.spyOn(MessageHelper, "successMessage");

    await user.forgotPassword(testEmail);

    // Assert that UserService.forgotPassword is called with the correct email
    expect(UserService.forgotPassword).toHaveBeenCalledWith(testEmail);
    expect(MessageHelper.successMessage).toHaveBeenCalledWith("An email has been sent to your email address with instructions on resetting your password");
  });
});

describe("handleModal", () => {
  // Sets the 'isShowModal' value to the passed boolean parameter.
  it("should set isShowModal value to the passed boolean parameter", () => {
    const isShowModal = true;
    handleModal(isShowModal);
    expect(store.user.showModal).toBe(isShowModal);
  });

  // If a 'username' parameter is passed, finds the corresponding user in the store and sets it as the selected user.
  it("should find the corresponding user in the store and set it as the selected user when a username parameter is passed", () => {
    const isShowModal = true;
    const username = "testUser";
    const userSelected: UserResponse = {
      returnedRecords: 1,
      totalRecords: 1,
      users: [
        {
          username: "testUser",
          email: "test@test.com",
          firstName: "test",
          lastName: "test",
          accountLocked: false,
          companyProfiles: [],
          credentialsExpired: false,
          role: RolesByUserList.Basic,
          enabled: true,
          lastLogin: "1255458",
          timeZone: "America/Los_Angeles"
        }
      ]
    };
    store.user.data = userSelected;
    handleModal(isShowModal, username);
    expect(store.user.showModal).toBe(isShowModal);
    expect(store.user.userSelected).toStrictEqual(userSelected.users[0]);
  });

  // Calls the 'setShowModal' function of the 'store.user' object with the passed boolean parameter.
  it("should call setShowModal function of store.user object with the passed boolean parameter", () => {
    const isShowModal = true;
    const setShowModal = jest.fn();
    store.user.setShowModal = setShowModal;
    handleModal(isShowModal);
    expect(setShowModal).toHaveBeenCalledWith(isShowModal);
  });
});
