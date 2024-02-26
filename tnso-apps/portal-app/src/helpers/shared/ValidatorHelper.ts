import { store } from "../../store/StoreMobx";
import { TRANSLATION } from "../../utils/const/translation";
import { i18nInstance as i18n } from "../../i18n";

export class ValidatorHelper {
  public static validatePassword(value: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const lowerCase = /^(?=.*[a-z])/;
    const upperCase = /^(?=.*[A-Z])/;
    const number = /^(?=.*[0-9])/;
    // eslint-disable-next-line no-useless-escape
    const specialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const spaceCharacter = /\s/;

    let amountOfCoincidences = 0;

    if (lowerCase.test(value)) {
      amountOfCoincidences++;
    }
    if (upperCase.test(value)) {
      amountOfCoincidences++;
    }
    if (number.test(value)) {
      amountOfCoincidences++;
    }
    if (specialCharacter.test(value)) {
      amountOfCoincidences++;
    }
    if (spaceCharacter.test(value)) {
      amountOfCoincidences++;
    }

    if (amountOfCoincidences < 2) {
      return false;
    }

    return true;
  }

  public static validatePasswordUsername(value: string, username: string): boolean {
    let errorMessage = "";

    if (value === username) {
      errorMessage = i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY.passwordCannotBeTheSameAsUsername);
    }

    return errorMessage === "";
  }

  public static async validateCompanyName(value: string, previousName: string): Promise<boolean> {
    try {
      if (value !== previousName && value !== "") {
        const result = await store.companyProfile.isAvailable(value);
        if (result?.available === false) {
          return false;
        }
      }
    } catch (error) {
      console.error(error);
    }
    return true;
  }

  public static async validateEmail(value: string, previousName: string): Promise<boolean> {
    try {
      if (value !== previousName && value !== "") {
        const result = await store.user.isAvailableByEmail(value);
        if (result?.available === false) {
          return false;
        }
      }
    } catch (error) {
      console.error(error);
    }
    return true;
  }

  public static async validateUsername(value: string, previousName: string): Promise<boolean> {
    try {
      if (value !== previousName && value !== "") {
        const result = await store.user.isAvailableByUsername(value);
        if (result?.available === false) {
          return false;
        }
      }
    } catch (error) {
      return true;
    }
    return true;
  }
}
