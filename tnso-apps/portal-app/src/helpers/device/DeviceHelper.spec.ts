import { Geolocation } from "../../interfaces/devices/geolocation/geolocation";
import { ConnectivityStatus, Device, UpdateDeviceStatus } from "../../interfaces/devices/devices";
import { DeviceHelper } from "./DeviceHelper";

describe("DeviceHelper", () => {
  // Tests that calculateStatus function returns the correct status for devices with different connectivity statuses
  it("test_calculate_status_returns_correct_status_for_devices_with_different_connectivity_statuses", () => {
    const devices: Geolocation[] = [
      { connectivityStatus: ConnectivityStatus.offline, latitude: 552.2, longitude: 552.2, tnsDeviceName: "device1", acna: "acna1" },
      { connectivityStatus: ConnectivityStatus.offline, latitude: 552.2, longitude: 552.2, tnsDeviceName: "device2", acna: "acna2" },
      { connectivityStatus: ConnectivityStatus.offline, latitude: 552.2, longitude: 552.2, tnsDeviceName: "device3", acna: "acna3" },
      { connectivityStatus: ConnectivityStatus.offline, latitude: 552.2, longitude: 552.2, tnsDeviceName: "device4", acna: "acna4" }
    ];
    expect(DeviceHelper.calculateStatus(devices)).toEqual(ConnectivityStatus.offline);
  });

  // Tests that normalizedStatusName function returns the correct normalized status name
  it("test_normalized_status_name_returns_correct_normalized_status_name", () => {
    expect(DeviceHelper.normalizedStatusName(ConnectivityStatus.onPrimary)).toEqual("onPrimary");
    expect(DeviceHelper.normalizedStatusName(ConnectivityStatus.onBackup)).toEqual("onBackup");
    expect(DeviceHelper.normalizedStatusName(ConnectivityStatus.offline)).toEqual("offline");
    expect(DeviceHelper.normalizedStatusName(ConnectivityStatus.indeterminate)).toEqual("indeterminate");
    expect(DeviceHelper.normalizedStatusName(ConnectivityStatus.unknown)).toEqual("unknown");
  });

  // Tests that filterMarkersByStatus function filters device locations correctly
  it("test_filter_markers_by_status_filters_device_locations_correctly", () => {
    const deviceLocation: Geolocation[] = [
      { connectivityStatus: ConnectivityStatus.onPrimary, tnsDeviceName: "device1", latitude: 552.2, longitude: 552.2, acna: "acna1" },
      { connectivityStatus: ConnectivityStatus.onBackup, tnsDeviceName: "device2", latitude: 552.2, longitude: 552.2, acna: "acna2" },
      { connectivityStatus: ConnectivityStatus.offline, tnsDeviceName: "device3", latitude: 552.2, longitude: 552.2, acna: "acna3" },
      { connectivityStatus: ConnectivityStatus.indeterminate, tnsDeviceName: "device4", latitude: 552.2, longitude: 552.2, acna: "acna4" }
    ];
    const statuses = [ConnectivityStatus.indeterminate, ConnectivityStatus.offline];
    const expectedDeviceLocation = [
      { connectivityStatus: ConnectivityStatus.offline, tnsDeviceName: "device3", latitude: 552.2, longitude: 552.2, acna: "acna3" },
      { connectivityStatus: ConnectivityStatus.indeterminate, tnsDeviceName: "device4", latitude: 552.2, longitude: 552.2, acna: "acna4" }
    ];
    expect(DeviceHelper.filterMarkersByStatus(deviceLocation, statuses)).toEqual(expectedDeviceLocation);
  });

  // Tests that arrayOfStatusAvailables function returns the correct array of allowed statuses
  it("test_array_of_status_availables_returns_correct_array_of_allowed_statuses", () => {
    const devicesStatus = {
      onPrimary: 1,
      offline: 3,
      indeterminate: 4,
      onBackup: 2,
      unknown: 5
    };
    const expectedArrayOfAllowedStatus = [
      ConnectivityStatus.onPrimary,
      ConnectivityStatus.offline,
      ConnectivityStatus.indeterminate,
      ConnectivityStatus.onBackup,
      ConnectivityStatus.unknown
    ];
    expect(DeviceHelper.arrayOfStatusAvailables(devicesStatus)).toEqual(expectedArrayOfAllowedStatus);
  });
});
