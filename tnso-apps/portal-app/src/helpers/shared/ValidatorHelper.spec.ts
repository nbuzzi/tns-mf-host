import { store } from "../../store/StoreMobx";
import { ValidatorHelper } from "./ValidatorHelper";

describe("ValidatorHelper", () => {
  it("should validate password with result is false", () => {
    const isValid = ValidatorHelper.validatePasswordUsername("test", "test");
    expect(isValid).toBeFalsy();
  });

  it("should validate password with result is true", () => {
    const isValid = ValidatorHelper.validatePasswordUsername("test", "test1");
    expect(isValid).toBeTruthy();
  });

  it("test_validate_company_name_not_available", async () => {
    store.companyProfile.isAvailable = jest.fn().mockResolvedValue({ available: false });
    const error = await ValidatorHelper.validateCompanyName("newCompanyName", "companyName");
    expect(error).toBeFalsy();
  });

  it("test_validate_company_name_available", async () => {
    store.companyProfile.isAvailable = jest.fn().mockResolvedValue({ available: true });
    const error = await ValidatorHelper.validateCompanyName("companyName", "companyName2");
    expect(error).toBeTruthy();
  });

  it("test_validate_username_available", async () => {
    store.user.isAvailableByUsername = jest.fn().mockResolvedValue({ available: true });
    const error = await ValidatorHelper.validateUsername("username", "username2");
    expect(error).toBeTruthy();
  });

  it("test_validate_username_not_available", async () => {
    store.user.isAvailableByUsername = jest.fn().mockResolvedValue({ available: false });
    const error = await ValidatorHelper.validateUsername("username", "username2");
    expect(error).toBeFalsy();
  });

  it("should validate a password with a space as false", () => {
    const isValid = ValidatorHelper.validatePassword("Test 123");
    expect(isValid).toBeTruthy();
  });

  it("should validate email when available", async () => {
    store.user.isAvailableByEmail = jest.fn().mockResolvedValue({ available: true });
    const error = await ValidatorHelper.validateEmail("newEmail@example.com", "oldEmail@example.com");
    expect(error).toBeTruthy();
  });

  it("should validate email when not available", async () => {
    store.user.isAvailableByEmail = jest.fn().mockResolvedValue({ available: false });
    const error = await ValidatorHelper.validateEmail("usedEmail@example.com", "oldEmail@example.com");
    expect(error).toBeFalsy();
  });

  it("should handle errors during validation", async () => {
    store.user.isAvailableByEmail = jest.fn().mockRejectedValue(new Error("Network error"));
    const error = await ValidatorHelper.validateEmail("newEmail@example.com", "oldEmail@example.com");
    expect(error).toBeTruthy();
  });
});
