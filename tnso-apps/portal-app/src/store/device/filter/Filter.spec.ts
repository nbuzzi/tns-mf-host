import { store } from "../../StoreMobx";
import { ConnectivityStatus, OperationalStatus } from "../../../interfaces/devices/devices";

describe("FilterStore", () => {
  // Tests that setFilteredDevicesTable updates filteredDevicesTable correctly
  it("test_set_filtered_devices_table_updates_filtered_devices_table_correctly", () => {
    const filter = store.device.filter;
    filter.setFilteredDevicesTable(["value1"], "id1");
    expect(filter.filteredDevicesTable).toEqual([{ id: "id1", value: ["value1"] }]);
    filter.setFilteredDevicesTable(["value2"], "id2");
    expect(filter.filteredDevicesTable).toEqual([
      { id: "id1", value: ["value1"] },
      { id: "id2", value: ["value2"] }
    ]);
    filter.setFilteredDevicesTable(["value3"], "id1");
    expect(filter.filteredDevicesTable).toEqual([
      { id: "id2", value: ["value2"] },
      { id: "id1", value: ["value3"] }
    ]);
  });

  // Tests that setActiveFiltersData updates activeFilters correctly
  it("test_set_active_filters_data_updates_active_filters_correctly", () => {
    const filter = store.device.filter;
    filter.setActiveFiltersData({ acnas: "acna1" });
    expect(filter.activeFilters).toEqual({ acnas: "acna1" });
    filter.setActiveFiltersData({ companyName: "company1" });
    expect(filter.activeFilters).toEqual({ acnas: "acna1", companyName: "company1" });
  });

  // Tests that setIsSelectedTableView toggles selectedTableView correctly
  it("test_set_is_selected_table_view_toggles_selected_table_view_correctly", () => {
    const filter = store.device.filter;
    filter.setIsSelectedTableView();
    expect(filter.selectedTableView).toBe(true);
    filter.setIsSelectedTableView();
    expect(filter.selectedTableView).toBe(false);
  });

  // Tests that setFilteredDevicesData filters and sets devices correctly
  it("test_set_filtered_devices_data_filters_and_sets_devices_correctly", () => {
    const filter = store.device.filter;
    const devices = [
      {
        tnsDeviceName: "device1",
        knownAs: "A1",
        connectivityStatus: ConnectivityStatus.indeterminate,
        acna: "ACNA1",
        country: "US",
        customerDeviceName: "device1",
        hasGeolocation: true,
        operationalStatus: OperationalStatus.operational
      },
      {
        tnsDeviceName: "device2",
        knownAs: "A2",
        connectivityStatus: ConnectivityStatus.indeterminate,
        acna: "ACNA2",
        country: "US",
        customerDeviceName: "device2",
        hasGeolocation: true,
        operationalStatus: OperationalStatus.operational
      },
      {
        tnsDeviceName: "device3",
        knownAs: "A3",
        connectivityStatus: ConnectivityStatus.indeterminate,
        acna: "ACNA3",
        country: "US",
        customerDeviceName: "device3",
        hasGeolocation: true,
        operationalStatus: OperationalStatus.operational
      }
    ];
    filter.setFilteredDevicesData(devices, ["acna1", "acna2"]);
    expect(store.devices.devices).toEqual(devices);
  });

  // Tests that resetAllFilters resets page, filteredDevicesTable, clearDevicesTableInputs, selectedStatuses and removes queryParams from localStorage
  it("test_reset_all_filters_resets_page_filtered_devices_table_clear_devices_table_inputs_selected_statuses_and_removes_query_params_from_local_storage", () => {
    const filter = store.device.filter;
    store.devices.setCurrentPage(2);
    filter.setFilteredDevicesTable(["value1"], "id1");
    filter.setActiveFiltersData({ acnas: "acna1" });
    filter.setIsSelectedTableView();
    store.devices.setSelectedStatuses([ConnectivityStatus.offline]);
    localStorage.setItem("queryParams", "params");
    filter.resetAllFilters();
    expect(store.devices.currentPage).toBe(1);
    expect(filter.filteredDevicesTable).toEqual([]);
    expect(filter.isFilteredTable).toBe(true);
    expect(filter.selectedTableView).toBe(true);
    expect(store.devices.selectedStatuses).toEqual([
      ConnectivityStatus.onPrimary,
      ConnectivityStatus.onBackup,
      ConnectivityStatus.offline,
      ConnectivityStatus.indeterminate,
      ConnectivityStatus.unknown
    ]);
    expect(localStorage.getItem("queryParams")).toBe(null);
  });

  // Tests that setFilteredDevicesTable handles empty values array
  it("test_set_filtered_devices_table_handles_empty_values_array", () => {
    const filter = store.device.filter;
    filter.setFilteredDevicesTable(["value1"], "id1");
    filter.setFilteredDevicesTable([], "id1");
    expect(filter.filteredDevicesTable).toEqual([]);
  });
});
