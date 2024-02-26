import { ErrorHelper } from "./ErrorHelper";

describe("ErrorHelper", () => {
  // Returns a Record<string, string> object with error messages for badRequest, notFound, and internalServerError.
  it("should return a Record<string, string> object with error messages for badRequest, notFound, and internalServerError", () => {
    const errorHelper = ErrorHelper;
    const errorHTTP = errorHelper.errorHTTP;

    expect(errorHTTP).toEqual({
      badRequest: "I'm sorry, but the request is invalid.",
      internalserverError: "I'm sorry, but the server is not responding.",
      notFound: "I'm sorry, but the requested resource could not be found."
    });
  });

  // Returns a Record<string, string> object with error messages for accountLocked, accountExpired, accountDisabled, and userNotFound.
  it("should return a Record<string, string> object with error messages for accountLocked, accountExpired, accountDisabled, and userNotFound", () => {
    const errorHelper = ErrorHelper;
    const login = errorHelper.login;

    expect(login).toEqual({
      accountDisabled: "Your account is expired. Please contact your administrator to renew it.",
      accountExpired: "Your account is expired. Please contact your administrator to renew it.",
      accountLocked: "Your account is locked. Please contact your administrator to unlock it.",
      userNotFound: "Incorrect username and/or password. Please try again"
    });
  });

  // Returns a Record<string, string> object with error messages for recentPasswordMatch, passwordMinLength, passwordComplexity, passwordContainsUsername, and badResetPasswordToken.
  it("should return a Record<string, string> object with error messages for recentPasswordMatch, passwordMinLength, passwordComplexity, passwordContainsUsername, and badResetPasswordToken", () => {
    const errorHelper = ErrorHelper;
    const password = errorHelper.password;

    expect(password).toEqual({
      badResetPasswordToken: "The reset password token is invalid or has expired. Please try again.",
      passwordComplexity: "The password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
      passwordContainsUsername: "Password cannot contain Username.",
      passwordMinLength: "The password must be at least 12 characters long.",
      recentPasswordMatch: "Password must not match recently used passwords."
    });
  });

  // TRANSLATION.ERROR.requestIsInvalid is not defined.
  it("should return an empty string when TRANSLATION.ERROR.requestIsInvalid is not defined", () => {
    const errorHelper = ErrorHelper;
    const errorHTTP = errorHelper.errorHTTP;

    expect(errorHTTP.badRequest).toEqual("I'm sorry, but the request is invalid.");
  });

  // TRANSLATION.ERROR.requestedResourceCouldNotBeFound is not defined.
  it("should return an empty string when TRANSLATION.ERROR.requestedResourceCouldNotBeFound is not defined", () => {
    const errorHelper = ErrorHelper;
    const errorHTTP = errorHelper.errorHTTP;

    expect(errorHTTP.notFound).toEqual("I'm sorry, but the requested resource could not be found.");
  });

  // TRANSLATION.ERROR.serverIsNotResponding is not defined.
  it("should return an empty string when TRANSLATION.ERROR.serverIsNotResponding is not defined", () => {
    const errorHelper = ErrorHelper;
    const errorHTTP = errorHelper.errorHTTP;

    expect(errorHTTP.internalserverError).toEqual("I'm sorry, but the server is not responding.");
  });
});
