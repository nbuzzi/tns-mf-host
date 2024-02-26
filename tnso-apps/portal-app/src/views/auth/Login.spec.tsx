import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { I18nextProvider } from "react-i18next";
import i18next from "../../i18n";

describe("Login", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </I18nextProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
