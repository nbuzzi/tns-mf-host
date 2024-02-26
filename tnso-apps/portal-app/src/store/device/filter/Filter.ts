import { ConnectivityStatus, Device, DeviceParams } from "../../../interfaces/devices/devices";
import { Key } from "react";
import { makeAutoObservable } from "mobx";
import { store } from "../../StoreMobx";

interface FilterTableState {
  id: string;
  value: string[];
}

export interface IFilter {
  activeFilters?: DeviceParams;
  isFilteredTable: boolean;
  selectedTableView: boolean;
  filteredDevicesTable?: FilterTableState[];

  setFilteredDevicesTable: (values: string[], id: string) => void;
  setIsSelectedTableView: () => void;
  setActiveFiltersData: (params: DeviceParams) => void;
  setFilteredDevicesData: (devices?: Device[], groups?: Key[]) => void;
  cleanFilteredDevicesTable: () => void;
  resetAllFilters: () => void;
}

export class Filter implements IFilter {
  activeFilters?: DeviceParams;
  isFilteredTable = false;
  selectedTableView = false;
  filteredDevicesTable?: FilterTableState[];

  constructor() {
    makeAutoObservable(this);
  }

  setFilteredDevicesTable = (values: string[], id: string): void => {
    store.devices.setCurrentPage(1);

    const newState = { id, value: values };
    const newFiltersState = (filteredDevicesTable: FilterTableState[]): FilterTableState[] => {
      const array = [...filteredDevicesTable].filter((filter) => !(filter.id === id));

      if (values[0] === "") {
        return [...filteredDevicesTable].filter((filter) => !(filter.id === id));
      } else {
        return values.length > 0 ? [...array, newState] : [...array];
      }
    };
    const filters = newFiltersState(this.filteredDevicesTable ?? []);
    this.filteredDevicesTable = filters;
  };

  setActiveFiltersData = (filters: DeviceParams): void => {
    this.activeFilters = { ...this.activeFilters, ...filters };
  };

  setIsSelectedTableView = (): void => {
    this.selectedTableView = !this.selectedTableView;
  };

  setFilteredDevicesData = (devices?: Device[], groupsAcna?: Key[]): void => {
    if (groupsAcna && devices) {
      const filteredDevices = devices.filter((device) => device && groupsAcna.includes(device.acna));
      store.devices.setDevices(filteredDevices && filteredDevices.length > 0 ? filteredDevices : devices);
    }
  };

  cleanFilteredDevicesTable = (): void => {
    this.filteredDevicesTable = [];
    this.isFilteredTable = !this.isFilteredTable;
    this.activeFilters = undefined;
  };

  resetAllFilters = (): void => {
    // reset page
    store.devices.setCurrentPage(1);

    // reset table filters
    this.filteredDevicesTable = [];
    this.isFilteredTable = !this.isFilteredTable;
    this.activeFilters = undefined;

    // reset status
    store.devices.setSelectedStatuses([...Object.values(ConnectivityStatus)]);
    localStorage.removeItem("queryParams");
  };
}

const filter = new Filter();

export default filter;
