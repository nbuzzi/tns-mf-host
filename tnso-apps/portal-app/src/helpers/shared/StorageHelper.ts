export class StorageHelper {
  static setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static getItem(key: string): string {
    return localStorage.getItem(key) ?? "";
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static gteItemParsed<T = any>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }

  static setAuthInfoUser(originalAccessToken: string, originalRefreshToken: string, accessToken: string, refreshToken: string): void {
    localStorage.setItem("originalAccessToken", originalAccessToken || "");
    localStorage.setItem("originalRefreshToken", originalRefreshToken || "");
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  static clearAuthInfoUser(): void {
    localStorage.removeItem("originalAccessToken");
    localStorage.removeItem("originalRefreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  static getAuthInfoUser(): Record<string, string> | undefined {
    return {
      originalAccessToken: localStorage.getItem("originalAccessToken") || "",
      originalRefreshToken: localStorage.getItem("originalRefreshToken") || "",
      accessToken: localStorage.getItem("accessToken") || "",
      refreshToken: localStorage.getItem("refreshToken") || ""
    };
  }
}
