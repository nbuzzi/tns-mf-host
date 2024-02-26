import { makeAutoObservable } from "mobx";
import { StatusCode } from "../../../helpers/api/RequestHelper";
import { MessageHelper } from "../../../helpers/shared/MessageHelper";
import { DeviceAddress, DeviceDetail } from "../../../interfaces/devices/devices";
import { DeviceService } from "../../../service/device/DeviceService";

export interface IDetail {
  data?: DeviceDetail;
  address?: DeviceAddress;
  loadData: (tnsDeviceName?: string) => Promise<void>;
}

class Detail implements IDetail {
  data?: DeviceDetail = undefined;
  address?: DeviceAddress = undefined;
  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (tnsDeviceName?: string): Promise<void> => {
    try {
      if (tnsDeviceName) {
        const response = await DeviceService.getDetail(tnsDeviceName);
        if (response?.status === StatusCode.OK && response?.data) {
          this.data = response.data;
          this.address = {
            city: response.data.city,
            countryCode: response.data.country,
            state: response.data.state,
            street1: response.data.streetAddress,
            street2: response.data.streetAddress2,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            zipCode: response.data.zipCode
          };
        }
      }
    } catch (error) {
      MessageHelper.errorMessage("Error loading device detail");
        }
  };
}

const detail = new Detail();

export default detail;
