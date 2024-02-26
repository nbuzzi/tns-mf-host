import { CellularUsageService } from "./CellularUsageService";

describe("CellularUsageService", () => {
  it("should be undefined", async () => {
    const response = await CellularUsageService.getWireless("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await CellularUsageService.getCurrent("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await CellularUsageService.getBilling({ tnsDeviceName: "mock", startDate: "01-01-2023", endDate: "31-01-2023" });

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await CellularUsageService.getBillingPeriod("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await CellularUsageService.getHistorical("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });
});
