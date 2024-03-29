import { store } from "../StoreMobx";
import { DevicesResponse } from "../../interfaces/devices/response/response";
import { ConnectivityStatus, OperationalStatus, ServiceStatus } from "../../interfaces/devices/devices";
import { DeviceService } from "../../service/device/DeviceService";
import { StatusCode } from "../../helpers/api/RequestHelper";
import { builderDeviceQueryParams, handleSearch } from "./tableConfig";

describe("DeviceStore", () => {
  it("test_load_data_undefined", async () => {
    const devices = store.devices;
    await devices.loadData();
    expect(devices.data).toBeUndefined();
  });

  it("test_load_data_success", async () => {
    const mockResponse: DevicesResponse = {
      totalRecords: 1,
      returnedRecords: 10,
      devices: [
        {
          tnsDeviceName: "device1",
          knownAs: "A1",
          connectivityStatus: ConnectivityStatus.indeterminate,
          acna: "ACNA1",
          country: "US",
          customerDeviceName: "device1",
          hasGeolocation: true,
          operationalStatus: OperationalStatus.Operational
        }
      ]
    };
    DeviceService.getAll = jest.fn().mockResolvedValue({ data: mockResponse, status: StatusCode.OK });
    const devices = store.devices;
    await devices.loadData();
    expect(devices.data).toEqual(mockResponse);
  });

  it("test_load_devicesStatus_success", async () => {
    const mockResponse: ServiceStatus = {
      indeterminate: 1,
      offline: 1,
      onBackup: 1,
      unknown: 1,
      onPrimary: 1
    };
    DeviceService.getStatus = jest.fn().mockResolvedValue({ data: mockResponse, status: StatusCode.OK });
    const devices = store.devices;
    await devices.loadDevicesStatus();
    expect(devices.devicesStatus).toEqual(mockResponse);
  });

  // Tests that current page is set successfully
  it("test_set_current_page_successfully", () => {
    const devices = store.devices;
    const page = 2;
    devices.setCurrentPage(page);
    expect(devices.currentPage).toEqual(page);
  });

  // Tests that devices status is set successfully
  it("test_set_devices_status_successfully", () => {
    const devices = store.devices;
    const statuses = { onPrimary: 1, offline: 2, onBackup: 3, unknown: 4, indeterminate: 5 };
    devices.setDevicesStatus(statuses);
    expect(devices.devicesStatus).toEqual(statuses);
  });

  // Tests that selected statuses are set successfully
  it("test_set_selected_statuses_successfully", () => {
    const devices = store.devices;
    const statuses = [ConnectivityStatus.offline, ConnectivityStatus.onPrimary];
    devices.setSelectedStatuses(statuses);
    expect(devices.selectedStatuses).toEqual(statuses);
  });

  // Tests that status filters are set successfully
  it("test_set_status_filters_successfully", () => {
    const devices = store.devices;
    const status = ConnectivityStatus.offline;
    const statuses = [ConnectivityStatus.onPrimary];
    const devicesStatus = { onPrimary: 1, offline: 2, onBackup: 3, unknown: 4, indeterminate: 5 };
    devices.setDevicesStatus(devicesStatus);
    devices.setStatusFilters(status);
    expect(devices.selectedStatuses).toEqual(statuses);
  });
});

// Generated by CodiumAI

describe("handleSearch", () => {
  // Calls builderDeviceQueryParams with the correct tableFilters object when filter is not "all"
  it("calls builderDeviceQueryParams with the correct tableFilters object when filter is not 'all'", () => {
    const filter = "onPrimary";
    const keyFilter = "connectivityStatus";
    const queryParams = builderDeviceQueryParams({ tableFilters: { [keyFilter]: filter } });
    expect(queryParams.connectivityStatus).toEqual(filter);
  });
});
