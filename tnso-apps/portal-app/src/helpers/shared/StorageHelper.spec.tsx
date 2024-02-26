import { StorageHelper } from "./StorageHelper";

describe("StorageHelper", () => {
  // Can set an item in local storage using setItem method
  it("should set an item in local storage when setItem method is called", () => {
    const key = "testKey";
    const value = "testValue";

    StorageHelper.setItem(key, value);

    expect(localStorage.getItem(key)).toEqual(value);
  });

  // Can get an item from local storage using getItem method
  it("should get an item from local storage when getItem method is called", () => {
    const key = "testKey";
    const value = "testValue";
    localStorage.setItem(key, value);

    const result = StorageHelper.getItem(key);

    expect(result).toEqual(value);
  });

  // Can remove an item from local storage using removeItem method
  it("should remove an item from local storage when removeItem method is called", () => {
    const key = "testKey";

    StorageHelper.removeItem(key);

    expect(localStorage.getItem(key)).toBeNull();
  });

  // Should set all four auth info values correctly when provided with valid inputs
  it("should set all four auth info values correctly when provided with valid inputs", () => {
    // Arrange
    const originalAccessToken = "originalAccessToken";
    const originalRefreshToken = "originalRefreshToken";
    const accessToken = "accessToken";
    const refreshToken = "refreshToken";

    // Act
    StorageHelper.setAuthInfoUser(originalAccessToken, originalRefreshToken, accessToken, refreshToken);

    // Assert
    expect(localStorage.getItem("originalAccessToken")).toEqual(originalAccessToken);
    expect(localStorage.getItem("originalRefreshToken")).toEqual(originalRefreshToken);
    expect(localStorage.getItem("accessToken")).toEqual(accessToken);
    expect(localStorage.getItem("refreshToken")).toEqual(refreshToken);
  });

  // Verify that all four items ('originalAccessToken', 'originalRefreshToken', 'accessToken', 'refreshToken') are removed from localStorage when 'clearAuthInfoUser' is called.
  it("should remove all four items from localStorage", () => {
    // Arrange
    const originalAccessToken = "originalAccessToken";
    const originalRefreshToken = "originalRefreshToken";
    const accessToken = "accessToken";
    const refreshToken = "refreshToken";
    StorageHelper.setAuthInfoUser(originalAccessToken, originalRefreshToken, accessToken, refreshToken);

    // Act
    StorageHelper.clearAuthInfoUser();

    // Assert
    expect(localStorage.getItem("originalAccessToken")).toBeNull();
    expect(localStorage.getItem("originalRefreshToken")).toBeNull();
    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
  });

  // Should return an object with all auth info properties when all properties are present in localStorage
  it("should return an object with all auth info properties when all properties are present in localStorage", () => {
    // Arrange
    const originalAccessToken = "originalAccessToken";
    const originalRefreshToken = "originalRefreshToken";
    const accessToken = "accessToken";
    const refreshToken = "refreshToken";
    StorageHelper.setAuthInfoUser(originalAccessToken, originalRefreshToken, accessToken, refreshToken);

    // Act
    const result = StorageHelper.getAuthInfoUser();

    // Assert
    expect(result).toEqual({
      originalAccessToken,
      originalRefreshToken,
      accessToken,
      refreshToken
    });
  });
});
