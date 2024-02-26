import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { UptimeChart } from "./UptimeChart";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";

describe("UptimeChart", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18n}>
        <UptimeChart />
      </I18nextProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders without crashing", () => {
    const { getAllByText } = render(
      <I18nextProvider i18n={i18n}>
        <UptimeChart />
      </I18nextProvider>
    );
    expect(getAllByText(/Device Uptime/gi)).toBeDefined();
  });

  it("should update data when handleViewMonthly is called", () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <UptimeChart />
      </I18nextProvider>
    );

    fireEvent.click(getByText("6 Months"));
    waitFor(() => {
      const updatedComponent = getByText("12 Months");
      expect(updatedComponent).toBeInTheDocument();
    });

    waitFor(() => {
      fireEvent.click(getByText("12 Months"));
      const updatedComponent2 = getByText("6 Months");
      expect(updatedComponent2).toBeInTheDocument();
    });
  });
});
