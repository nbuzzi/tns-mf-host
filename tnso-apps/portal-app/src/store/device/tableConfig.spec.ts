import { ConnectivityStatus } from "../../interfaces/devices/devices";
import { store } from "../StoreMobx";
import { builderDeviceQueryParams, getColumnSearchProps, handleSearch } from "./tableConfig";

describe("getColumnSearchProps", () => {
  // should return an object with filterDropdown, filterIcon, onFilter and onSort properties
  it("should return an object with filterDropdown, filterIcon, onFilter and onSort properties", () => {
    const dataIndex = "name";
    const columnSearchProps = getColumnSearchProps(dataIndex);

    expect(columnSearchProps).toHaveProperty("filterDropdown");
    expect(columnSearchProps).toHaveProperty("filterIcon");
    expect(columnSearchProps).toHaveProperty("onFilter");
  });

  // Calls builderDeviceQueryParams with tableFilters containing the keyFilter and filter values
  it("should call builderDeviceQueryParams with tableFilters containing the keyFilter and filter values", () => {
    const filter = "test";
    const keyFilter = "testKey";
    const queryParams = builderDeviceQueryParams({ tableFilters: { [keyFilter]: filter } });
    expect(queryParams).toEqual({ recordsPerPage: 10, startAtRecord: 0, [keyFilter]: filter });
  });

  // If filter is "all", sets filter to an empty string
  it('should set filter to an empty string if filter is "all"', () => {
    const filter = "all";
    const keyFilter = "connectivityStatus";

    handleSearch(filter, keyFilter);
    expect(store.device.filter.activeFilters?.[keyFilter]).toEqual("");
  });

  // If previousFilterValues is not equal to filter, sets previousFilterValues to filter
  it("should set previousFilterValues to filter if previousFilterValues is not equal to filter", async () => {
    const filter = ConnectivityStatus.offline;
    const keyFilter = "connectivityStatus";
    await handleSearch(filter, keyFilter);
    expect(store.device.filter.activeFilters?.[keyFilter]).toEqual(filter);
  });
});
