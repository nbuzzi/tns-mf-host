import { Period } from "../../../interfaces/devices/cellular/cellularSignal";
import { CellularSignalService } from "./CellularSignalService";

describe("CellularUsageService", () => {
  it("should be undefined", async () => {
    const response = await CellularSignalService.getTnsSignal("mock", Period.Daily);

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await CellularSignalService.downloadSignalReport("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await CellularSignalService.mostRecentSignal("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });
});
