import { GeolocationResponse } from "../../../interfaces/devices/response/response";
import { Geolocation as GeolocationModel, HasGeolocation, OptionsGeolocationTable } from "../../../interfaces/devices/geolocation/geolocation";
import { QueryParams } from "../../../interfaces/shared/queryParams";
import { makeAutoObservable } from "mobx";
import { LocationService } from "../../../service/device/LocationService";
import { DeviceParams } from "../../../interfaces/devices/devices";
import _ from "lodash";

export interface IGeolocation {
  data?: GeolocationResponse[];
  deviceLocation?: GeolocationModel;
  hasGeolocation?: HasGeolocation;
  geolocationOption: OptionsGeolocationTable;
  previousParams?: DeviceParams;

  loadData: (params?: QueryParams) => Promise<void>;
  loadLocation: (tnsDeviceName: string) => Promise<void>;
  loadHasGeolocation: () => Promise<void>;
  setLocation: (devicesLocation: GeolocationResponse[]) => void;
  setGeolocationOption: (options: OptionsGeolocationTable) => void;
}

export class Geolocation implements IGeolocation {
  data?: GeolocationResponse[];
  deviceLocation?: GeolocationModel;
  hasGeolocation?: HasGeolocation;
  geolocationOption: OptionsGeolocationTable = OptionsGeolocationTable.all;
  previousParams?: DeviceParams;

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (params?: QueryParams): Promise<void> => {
    const queryParams: DeviceParams = {};
    try {
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (key !== "startAtRecord" && key !== "recordsPerPage" && key !== "sortBy" && value) {
            queryParams[key as keyof DeviceParams] = value;
          }
        });
      }
      if (!this.data || !_.isEqual(queryParams, this.previousParams)) {
        this.previousParams = queryParams;
        const response = await LocationService.getAll(queryParams);
        if (response?.data) {
          this.data = response.data;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadLocation = async (tnsDeviceName: string): Promise<void> => {
    const name = tnsDeviceName;
    try {
      if ((name && !this.deviceLocation) || (name && this.deviceLocation && this.deviceLocation.tnsDeviceName !== name)) {
        const response = await LocationService.getByName(name);
        if (response?.data) {
          this.deviceLocation = { ...response.data, latitude: parseFloat(response.data.latitude), longitude: parseFloat(response.data.longitude) };
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadHasGeolocation = async (): Promise<void> => {
    try {
      const response = await LocationService.gethasGeolocation();
      if (response?.data) {
        this.hasGeolocation = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  setLocation = (devicesLocation: GeolocationResponse[]): void => {
    this.data = devicesLocation;
  };

  setGeolocationOption = (options: OptionsGeolocationTable): void => {
    this.geolocationOption = options;
  };
}

const geolocation = new Geolocation();

export default geolocation;
