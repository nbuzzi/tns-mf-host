import { render } from "@testing-library/react";
import { ComponentStatus } from "./MemberConnectivityStatus";
import { MemberConnectivityStatus } from "../../../../interfaces/memberConnectivity/memberConnectivity";
import i18n from "../../../../translations/i18n";
import { I18nextProvider } from "react-i18next";

describe("MemberConnectivityStatus", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18n}>
        <ComponentStatus status={MemberConnectivityStatus.DOWN} />
      </I18nextProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it("should render with a different status prop", () => {
    const statusExample: MemberConnectivityStatus = MemberConnectivityStatus.DOWN;
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <ComponentStatus status={MemberConnectivityStatus.DOWN} />
      </I18nextProvider>
    );

    expect(getByText("Down")).toBeTruthy();
    expect(getByText(statusExample)).toBeTruthy();
  });

  it("should render successfully with UP_SITE_TO_SITE status", () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18n}>
        <ComponentStatus status={MemberConnectivityStatus.UP_SITE_TO_SITE} />
      </I18nextProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
