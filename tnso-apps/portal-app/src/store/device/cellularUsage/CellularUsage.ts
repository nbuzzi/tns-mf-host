import { makeAutoObservable } from "mobx";
import { StatusCode } from "../../../helpers/api/RequestHelper";
import {
  CellularParams,
  CellularUsageBilling,
  CellularUsageBillingPeriod,
  DailyUsageStatus,
  CellularUsage as UsageModel
} from "../../../interfaces/devices/cellular/cellularUsage";
import { CellularUsageService } from "../../../service/device/deviceDetail/CellularUsageService";

export interface ICellularUsage {
  historical?: UsageModel[];
  billingPeriod?: CellularUsageBillingPeriod[];
  billing?: CellularUsageBilling;
  current?: UsageModel;
  currentData?: UsageModel;
  currentDate?: number;
  billingData?: CellularUsageBilling;
  isWireless: boolean;
  isClosedPeriod: boolean;

  loadHistorical(tnsDeviceName: string): Promise<void>;
  loadBillingPeriod(tnsDeviceName: string): Promise<void>;
  loadBilling(params: CellularParams): Promise<void>;
  loadCurrent(tnsDeviceName: string): Promise<void>;
  loadWireless(tnsDeviceName: string): Promise<boolean | undefined>;
  setIsClosedPeriod(isClosedPeriod: boolean): void;
  setActualDataUsage(usageBilling: CellularUsageBilling): void;
}

class CellularUsage implements ICellularUsage {
  historical?: UsageModel[];
  billingPeriod?: CellularUsageBillingPeriod[];
  billing?: CellularUsageBilling;
  current?: UsageModel | undefined;
  currentData?: UsageModel;
  currentDate?: number;
  billingData?: CellularUsageBilling;
  isWireless = false;
  isClosedPeriod = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadHistorical = async (tnsDeviceName: string): Promise<void> => {
    try {
      this.historical = undefined;
      const response = await CellularUsageService.getHistorical(tnsDeviceName);
      if (response?.status === StatusCode.OK && response?.data) {
        this.historical = response.data;
        return;
      }
      this.historical = undefined;
    } catch (error) {
      console.log(error);
    }
  };

  loadBillingPeriod = async (tnsDeviceName: string): Promise<void> => {
    try {
      this.billingPeriod = undefined;
      this.billingData = undefined;
      this.currentDate = undefined;
      this.billing = undefined;
      const response = await CellularUsageService.getBillingPeriod(tnsDeviceName);
      if (response?.status === StatusCode.OK && response?.data) {
        this.billingPeriod = response.data;
        if (this.billingPeriod[0].startDate && this.billingPeriod[0].endDate) {
          await this.loadBilling({ tnsDeviceName, startDate: this.billingPeriod[0]?.startDate, endDate: this.billingPeriod[0]?.endDate });
          this.billingData = this.billing;
          if (this.billingData) {
            this.setActualDataUsage(this.billingData);
          }
          return;
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadBilling = async (params: CellularParams): Promise<void> => {
    try {
      const response = await CellularUsageService.getBilling(params);
      if (response?.status === StatusCode.OK && response?.data) {
        this.billing = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadCurrent = async (tnsDeviceName: string): Promise<void> => {
    try {
      this.current = undefined;
      this.currentData = undefined;
      this.currentDate = undefined;
      const response = await CellularUsageService.getCurrent(tnsDeviceName);
      if (response?.status === StatusCode.OK && response?.data) {
        this.current = response.data;
        this.currentData = response.data;
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadWireless = async (tnsDeviceName: string): Promise<boolean | undefined> => {
    try {
      this.isWireless = false;
      const response = await CellularUsageService.getWireless(tnsDeviceName);
      if (response?.status === StatusCode.OK && response?.data) {
        this.isWireless = response.data.isWireless;
        return this.isWireless;
      }
    } catch (error) {
      console.log(error);
    }
  };

  setIsClosedPeriod = (isClosedPeriod: boolean): void => {
    this.isClosedPeriod = isClosedPeriod;
  };

  setActualDataUsage = (usageBilling: CellularUsageBilling): void => {
    const actualDataUsage = usageBilling.dailyDeviceUsage.filter(
      (usage) => usage.status === DailyUsageStatus.ACTUAL_NO_OVERAGE || usage.status === DailyUsageStatus.ACTUAL_OVERAGE
    );
    this.currentDate = actualDataUsage ? Number(actualDataUsage[actualDataUsage.length - 1]?.date) : undefined;
  };
}

const cellularUsage = new CellularUsage();

export default cellularUsage;
