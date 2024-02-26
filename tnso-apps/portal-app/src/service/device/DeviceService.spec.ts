import { ConnectivityStatus } from "../../interfaces/devices/devices";
import { DeviceService } from "./DeviceService";

describe("DeviceService", () => {
  it("should be undefined", async () => {
    const response = await DeviceService.getAll();

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await DeviceService.getDetail("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await DeviceService.create({
      acna: "mock",
      connectivityStatus: ConnectivityStatus.indeterminate,
      country: "mock",
      customerDeviceName: "mock",
      hasGeolocation: false,
      knownAs: "mock",
      operationalStatus: "mock",
      tnsDeviceName: "mock"
    });
    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined",async () => {
    const response = await DeviceService.delete("mock");
    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await DeviceService.getStatus();
    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });
});
