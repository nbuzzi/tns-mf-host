import { ConnectivityStatus } from "../../interfaces/devices/devices";
import { LocationService } from "./LocationService";

describe("LcationService", () => {
  it("should be undefined", async () => {
    const response = await LocationService.gethasGeolocation();

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await LocationService.getAll();

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await LocationService.getByGroupId(1);

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await LocationService.getByName("test");

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await LocationService.create({
      connectivityStatus: ConnectivityStatus.indeterminate,
      latitude: "0",
      longitude: "0",
      tnsDeviceName: "test",
      acna: "test"
    });

    expect(response).toEqual({ data: undefined, status: undefined });
  });
});
