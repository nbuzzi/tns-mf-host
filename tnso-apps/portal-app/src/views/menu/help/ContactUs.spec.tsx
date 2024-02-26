import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "../../../i18n";
import ContactUs from "./ContactUs";

describe("ContactUs", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <ContactUs />
        </BrowserRouter>
      </I18nextProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it("should display the title in English", () => {
    i18next.changeLanguage("en");
    const { getByText } = render(
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <ContactUs />
        </BrowserRouter>
      </I18nextProvider>
    );

    const title = getByText("Contact Us");
    expect(title).toBeInTheDocument();
    const firstSubtitle = getByText("Global Network Operations Center (NOC)");
    expect(firstSubtitle).toBeInTheDocument();
    const secondSubtitle = getByText("Client Management Services");
    expect(secondSubtitle).toBeInTheDocument();
  });
});
