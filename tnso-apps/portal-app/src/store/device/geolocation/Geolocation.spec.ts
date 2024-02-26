import { store } from "../../StoreMobx";
import { LocationService } from "../../../service/device/LocationService";
import { GeolocationResponse } from "../../../interfaces/devices/response/response";
import { ConnectivityStatus } from "../../../interfaces/devices/devices";
import { StatusCode } from "../../../helpers/api/RequestHelper";

describe("GeolocationStore", () => {
  // Tests that loading location with invalid tnsDeviceName returns undefined
  it("test_load_location_invalid_tns_device_name_returns_undefined", async () => {
    const geolocation = store.device.geolocation;
    LocationService.getByName = jest.fn().mockResolvedValue({ data: undefined });
    await geolocation.loadLocation("invalid_device");
    expect(LocationService.getByName).toHaveBeenCalledWith("invalid_device");
    expect(geolocation.deviceLocation).toBeUndefined();
  });

  // Tests that loading data with valid params returns data
  it("test_load_data_valid_params_returns_data", async () => {
    const geolocation = store.device.geolocation;
    const mockResponse: GeolocationResponse[] = [
      {
        acna: "acna1",
        connectivityStatus: ConnectivityStatus.indeterminate,
        latitude: "1.2345",
        longitude: "6.7890",
        tnsDeviceName: "device1"
      }
    ];
    LocationService.getAll = jest.fn().mockResolvedValue({ data: mockResponse, status: StatusCode.OK });
    await geolocation.loadData();
    expect(geolocation.data).toEqual(mockResponse);
  });

  // Tests that loading location with valid tnsDeviceName returns device location
  it("test_load_location_valid_tns_device_name_returns_device_location", async () => {
    const geolocation = store.device.geolocation;
    const mockResponse = {
      tnsDeviceName: "device1",
      acna: "acna1",
      connectivityStatus: ConnectivityStatus.indeterminate,
      latitude: "1.2345",
      longitude: "6.7890"
    };
    LocationService.getByName = jest.fn().mockResolvedValue({ data: mockResponse });
    await geolocation.loadLocation("device1");
    expect(LocationService.getByName).toHaveBeenCalledWith("device1");
    expect(geolocation.deviceLocation).toEqual({ ...mockResponse, latitude: parseFloat(mockResponse.latitude), longitude: parseFloat(mockResponse.longitude) });
  });

  // Tests that loading hasGeolocation returns count of devices with no geolocation
  it("test_load_has_geolocation_returns_count_of_devices_with_no_geolocation", async () => {
    const geolocation = store.device.geolocation;
    const mockResponse = { count: 5 };
    LocationService.gethasGeolocation = jest.fn().mockResolvedValue({ data: mockResponse });
    await geolocation.loadHasGeolocation();
    expect(LocationService.gethasGeolocation).toHaveBeenCalled();
    expect(geolocation.hasGeolocation).toEqual(mockResponse);
  });

  // Tests that setting location updates data property
  it("test_set_location_updates_data_property", () => {
    const geolocation = store.device.geolocation;
    const mockData = [
      {
        tnsDeviceName: "device1",
        acna: "acna1",
        connectivityStatus: ConnectivityStatus.indeterminate,
        latitude: "1.2345",
        longitude: "6.7890"
      }
    ];
    geolocation.setLocation(mockData);
    expect(geolocation.data).toEqual(mockData);
  });
});
