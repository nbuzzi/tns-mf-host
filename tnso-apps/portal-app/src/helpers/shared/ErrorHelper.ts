import { TRANSLATION } from "../../../src/utils/const/translation";
import { i18nInstance as i18n } from "../../i18n";

export class ErrorHelper {
  static get errorHTTP(): Record<string, string> {
    return {
      badRequest: i18n.t(TRANSLATION.ERROR.requestIsInvalid),
      notFound: i18n.t(TRANSLATION.ERROR.requestedResourceCouldNotBeFound),
      internalserverError: i18n.t(TRANSLATION.ERROR.serverIsNotResponding)
    };
  }

  static get login(): Record<string, string> {
    return {
      accountLocked: i18n.t(TRANSLATION.ERROR.yourAccountIsLocked),
      accountExpired: i18n.t(TRANSLATION.ERROR.yourAccountIsExpired),
      accountDisabled: i18n.t(TRANSLATION.ERROR.yourAccountIsExpired),
      userNotFound: i18n.t(TRANSLATION.ERROR.incorrectUsernameAndOrPassword)
    };
  }

  static get password(): Record<string, string> {
    return {
      recentPasswordMatch: i18n.t(TRANSLATION.ERROR.passwordMustNotMatch),
      passwordMinLength: i18n.t(TRANSLATION.ERROR.passwordMustBe12CharactersLong),
      passwordComplexity: i18n.t(TRANSLATION.ERROR.thePasswordMustContain),
      passwordContainsUsername: i18n.t(TRANSLATION.ERROR.passwordCannotContainUsername),
      badResetPasswordToken: i18n.t(TRANSLATION.ERROR.resetPasswordTokenInvalid)
    };
  }
}
