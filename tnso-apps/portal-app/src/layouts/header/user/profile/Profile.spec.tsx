import React from "react";
import { render } from "@testing-library/react";
import { AssociatedCompaniesTable } from "./tab/AssociatedCompanies";
import { I18nextProvider } from "react-i18next";
import i18next from "../../../../i18n";

describe("AssociatedCompaniesTable", () => {
  beforeAll(() => {
    i18next.changeLanguage("en");
  });
  
  it("should render successfully", () => {
    const sampleData = [{ name: "Company A" }, { name: "Company B" }, { name: "Company C" }];
    const { baseElement } = render(<AssociatedCompaniesTable items={sampleData} isSuperUser={false} />);
    expect(baseElement).toBeTruthy();
  });
  it("should render error message for empty data", () => {
    const { getByTestId } = render(
      <I18nextProvider i18n={i18next}>
        <AssociatedCompaniesTable items={[]} isSuperUser={false} />
      </I18nextProvider>
    );
    i18next.changeLanguage("en");
  
    const emptyMessageElement = getByTestId("empty-message");
    const errorMessageText = emptyMessageElement.textContent;
  
    expect(errorMessageText).toBe("There are no associated companies");
  });


  it("should render message for super user", () => {
    const { getByTestId } = render(
      <I18nextProvider i18n={i18next}>
    <AssociatedCompaniesTable items={[]} isSuperUser={true} />
    </I18nextProvider>
    );
      
    const emptyMessageElement = getByTestId("empty-message");
    const errorMessageText = emptyMessageElement.textContent; 

    expect(errorMessageText).toBe("Super User has access to All Company Profiles");
  });
  it("should render message for super user with undefined items", () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18next}>
      <AssociatedCompaniesTable items={undefined} isSuperUser={true} />
      </I18nextProvider>);

    const errorMessageElement = getByText("Super User has access to All Company Profiles");

    expect(errorMessageElement).toBeDefined();
  });
  it("should render message for normal user with undefined items", () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18next}>
      <AssociatedCompaniesTable items={undefined} isSuperUser={false} />
      </I18nextProvider>);

    const errorMessageElement = getByText("There are no associated companies");
    expect(errorMessageElement).toBeDefined();
  });
});
