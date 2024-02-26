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

  it("should parse JSON and return the parsed value when getItemParsed method is called", () => {
    // Arrange
    const key = "testKey";
    const originalObject = { prop1: "value1", prop2: "value2" };
    StorageHelper.setItem(key, JSON.stringify(originalObject));

    // Act
    const result = StorageHelper.gteItemParsed(key);

    // Assert
    expect(result).toEqual(originalObject);
  });

  it("should return null when getItemParsed is called with a key that doesn't exist in localStorage", () => {
    // Arrange
    const nonExistentKey = "nonExistentKey";

    // Act
    const result = StorageHelper.gteItemParsed(nonExistentKey);

    // Assert
    expect(result).toBeNull();
  });

  it("should clear all items in localStorage when clear method is called", () => {
    // Arrange
    const key1 = "key1";
    const value1 = "value1";

    StorageHelper.setItem(key1, value1);

    // Act
    StorageHelper.clear();

    // Assert
    expect(localStorage.getItem(key1)).toBeNull();
  });

  it("should return an empty string when getItem method is called with a key that doesn't exist in localStorage", () => {
    // Arrange
    const nonExistentKey = "nonExistentKey";

    // Act
    const result = StorageHelper.getItem(nonExistentKey);

    // Assert
    expect(result).toEqual("");
  });

  it("should return undefined when some properties are missing in localStorage", () => {
    // Arrange
    const originalAccessToken = "originalAccessToken";
    const originalRefreshToken = "originalRefreshToken";
    StorageHelper.setAuthInfoUser(originalAccessToken, originalRefreshToken, "", ""); // Set only two properties

    // Act
    const result = StorageHelper.getAuthInfoUser();

    // Assert
    expect(result).toEqual({
      accessToken: "",
      originalAccessToken: "originalAccessToken",
      originalRefreshToken: "originalRefreshToken",
      refreshToken: ""
    });
  });

  // // Should return auth info with empty strings when some properties are missing but set to empty strings in localStorage
  it("should return auth info with empty strings when some properties are missing but set to empty strings in localStorage", () => {
    // Arrange
    StorageHelper.setAuthInfoUser("", "", "", "");

    // Act
    const result = StorageHelper.getAuthInfoUser();

    // Assert
    expect(result).toEqual({
      originalAccessToken: "",
      originalRefreshToken: "",
      accessToken: "",
      refreshToken: ""
    });
  });
});