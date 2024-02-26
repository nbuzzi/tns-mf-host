import { DevicesResponse } from "../../interfaces/devices/response/response";
import { ConnectivityStatus, DeviceAddress, Device as DeviceModel, DeviceParams, ServiceStatus } from "../../interfaces/devices/devices";
import { QueryParams } from "../../interfaces/shared/queryParams";
import { DeviceService } from "../../service/device/DeviceService";
import { makeAutoObservable } from "mobx";
import { DeviceHelper } from "../../helpers/device/DeviceHelper";
import _ from "lodash";
import { store } from "../StoreMobx";
import { MessageHelper } from "../../helpers/shared/MessageHelper";
import i18n from "../../i18n";
import { TRANSLATION } from "../../utils/const/translation";

export interface IDevice {
  data?: DevicesResponse;
  devices?: DeviceModel[];
  currentPage: number;
  devicesStatus?: ServiceStatus;
  selectedStatuses?: ConnectivityStatus[];
  totalDevices?: number;
  previousParams?: DeviceParams;
  dataAdress?: DeviceAddress;
  activeFilters: Record<string, string>;

  loadData: (params?: QueryParams) => Promise<void>;
  loadDevicesStatus: (queryParams?: DeviceParams) => Promise<void>;
  setActiveFiltersData: (keyFilter: string, valueFilter: string) => void;
  setCurrentPage: (page: number) => void;
  setSelectedStatuses: (status: ConnectivityStatus[]) => void;
  setStatusFilters: (status: ConnectivityStatus) => void;
  setDevices: (devices: DeviceModel[]) => void;
  setDevicesStatus: (statuses?: ServiceStatus) => void;
  toggleSelectedStatuses: () => void;
  cleanDevicesAndGeolocations: () => void;
  updateDeviceAddress: (deviceAddress: DeviceAddress, tnsDeviceName: string) => void;
}

export class Device implements IDevice {
  data?: DevicesResponse;
  devices?: DeviceModel[];
  currentPage = 1;
  devicesStatus?: ServiceStatus;
  selectedStatuses?: ConnectivityStatus[] = [...Object.keys(ConnectivityStatus)] as ConnectivityStatus[];
  totalDevices?: number;
  previousParams?: DeviceParams;
  dataAdress?: DeviceAddress;
  activeFilters: Record<string, string> = {};

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (params?: QueryParams): Promise<void> => {
    try {
      if (!this.data || !_.isEqual(params, this.previousParams)) {
        this.previousParams = params;
        const response = await DeviceService.getAll(params);
        if (response?.data) {
          this.data = response.data;
          this.devices = response.data.devices;
          if (!this.totalDevices) {
            this.totalDevices = response.data.totalRecords;
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
  };

  loadDevicesStatus = async (queryParams?: DeviceParams): Promise<void> => {
    try {
      this.devicesStatus = undefined;
      const response = await DeviceService.getStatus(queryParams);
      if (response?.data) {
        this.devicesStatus = response.data;
      }
    } catch (e) {
      console.warn(e);
    }
  };

  setActiveFiltersData = (keyFilter: string, valueFilter: string): void => {
    this.activeFilters[keyFilter] = valueFilter;
  };

  setCurrentPage = (page: number): void => {
    this.currentPage = page;
  };

  setDevicesStatus = (statuses?: ServiceStatus): void => {
    if (!statuses) {
      this.devicesStatus = {
        indeterminate: 0,
        offline: 0,
        onBackup: 0,
        onPrimary: 0,
        unknown: 0
      };
    } else {
      this.devicesStatus = statuses;
    }
  };

  setSelectedStatuses = (statuses: ConnectivityStatus[]): void => {
    this.selectedStatuses = statuses;
  };

  setStatusFilters = (status: ConnectivityStatus): void => {
    if (this.devicesStatus) {
      const statusAvailableToCheck = DeviceHelper.arrayOfStatusAvailables(this.devicesStatus);

      const prevStatuses = this.selectedStatuses;
      const prevStatus = prevStatuses ?? [];
      const index = prevStatus.indexOf(status);
      if (index === -1) {
        prevStatus.push(status);
      } else {
        prevStatus.splice(index, 1);
      }
      const statusesChecked = prevStatuses?.filter((status) => statusAvailableToCheck?.includes(status));

      if (statusesChecked) {
        this.selectedStatuses = statusesChecked.length > 0 ? [...statusesChecked] : undefined;
      } else {
        this.selectedStatuses = prevStatus.length > 0 ? [...prevStatus] : undefined;
      }

      if (this.selectedStatuses?.length === 0) {
        this.cleanDevicesAndGeolocations();
      }
    }
    this.setCurrentPage(1);
  };

  setDevices = (devices: DeviceModel[]): void => {
    this.devices = devices;
  };

  toggleSelectedStatuses = (): void => {
    if (this.devicesStatus) {
      const status = DeviceHelper.arrayOfStatusAvailables(this.devicesStatus);

      if (!this.selectedStatuses || this.selectedStatuses?.length < status.length) {
        if (this.devicesStatus) {
          this.selectedStatuses = status;
        } else {
          this.selectedStatuses = [...Object.values(ConnectivityStatus)];
        }
      } else {
        this.selectedStatuses = undefined;
        this.cleanDevicesAndGeolocations();
      }
    }
  };

  cleanDevicesAndGeolocations = (): void => {
    this.data = undefined;
    store.device.geolocation.data = undefined;
    // store.device.filter.setFilteredDevicesTable([]);
  };

  updateDeviceAddress = async (deviceAddress: DeviceAddress, tnsDeviceName: string): Promise<void> => {
    try {
      await DeviceService.updateAddress(deviceAddress, tnsDeviceName);
      MessageHelper.successMessage(i18n.t(TRANSLATION.MODAL.ALERT.successUpdateDeviceAddress));
    } catch (e) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.somethingWentWrong));
    }
  };
}

const device = new Device();

export default device;
