import { render } from "@testing-library/react";
import { LANCard } from "./LANCard";
import { DeviceLAN } from "src/interfaces/devices/configuration/configuration";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";

describe("LANCard", () => {
  it("should render successfully", async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <LANCard />
      </I18nextProvider>
    );

    expect(container).toBeTruthy();
  });

  it("should render with no LANData", async () => {
    const LANData: DeviceLAN = {
      lanIpAddress: "",
      lanSubnetMask: ""
    };

    const { queryByText } = render(
      <I18nextProvider i18n={i18n}>
        <LANCard LANData={LANData} />
      </I18nextProvider>
    );

    expect(queryByText("LAN")).not.toBeNull();
  });

  it("should render LANData correctly", async () => {
    const LANData: DeviceLAN = {
      lanIpAddress: "192.168.1.1",
      lanSubnetMask: "255.255.255.0"
    };

    const { queryByText } = render(
      <I18nextProvider i18n={i18n}>
        <LANCard LANData={LANData} />
      </I18nextProvider>
    );

    expect(queryByText("LAN")).not.toBeNull();
    expect(queryByText("192.168.1.1")).not.toBeNull();
    expect(queryByText("255.255.255.0")).not.toBeNull();
  });
});
