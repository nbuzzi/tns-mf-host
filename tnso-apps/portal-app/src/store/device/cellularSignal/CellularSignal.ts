import { makeAutoObservable } from "mobx";
import { StatusCode } from "../../../helpers/api/RequestHelper";
import { CellularSignal as CellularSignalModel, Period, SignalStrength } from "../../../interfaces/devices/cellular/cellularSignal";
import { CellularSignalService } from "../../../service/device/deviceDetail/CellularSignalService";
import { RawTNSSignalStates, TNSSignalStates } from "../../../interfaces/devices/chart/chart";
import { DeviceSignalHelper } from "../../../helpers/device/DeviceSignalHelper";

export interface ICellularSignal {
  data?: CellularSignalModel[];
  dataWeekly?: CellularSignalModel[];
  dataMonthly?: CellularSignalModel[];
  rawData?: CellularSignalModel[];
  graphData?: CellularSignalModel[];
  graphRawData?: CellularSignalModel[];
  signalStrength: SignalStrength[];
  tnsSignal: TNSSignalStates;
  rawTNSSignal: RawTNSSignalStates;
  signalReport?: string;
  mostRecentSignal?: CellularSignalModel;

  loadData: (tnsDeviceName: string, period: Period) => Promise<void>;
  loadMostRecentSignal: (tnsDeviceName: string) => Promise<void>;
  downloadSignalReport: (tnsDeviceName: string) => Promise<string | undefined>;
}

class CellularSignal implements ICellularSignal {
  data?: CellularSignalModel[];
  rawData?: CellularSignalModel[];
  graphData?: CellularSignalModel[];
  graphRawData?: CellularSignalModel[];
  signalStrength: SignalStrength[] = [];
  tnsSignal: TNSSignalStates = {
    current: [],
    daily: [],
    weekly: [],
    monthly: []
  };
  rawTNSSignal: RawTNSSignalStates = {
    current: {
      data: [],
      time: []
    },
    daily: {
      data: [],
      time: []
    },
    weekly: {
      data: [],
      time: []
    },
    monthly: {
      data: [],
      time: []
    }
  };
  signalReport?: string;
  mostRecentSignal?: CellularSignalModel;

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (tnsDeviceName: string, period: Period): Promise<void> => {
    try {
      const response = await CellularSignalService.getTnsSignal(tnsDeviceName, period);
      if (response?.status === StatusCode.OK && response?.data) {
        this.tnsSignal[period] = DeviceSignalHelper.calculateMovingAverage(response.data);
        this.rawTNSSignal[period] = DeviceSignalHelper.getRawData(response.data);
        this.tnsSignal.current = this.tnsSignal[period];
        this.rawTNSSignal.current = this.rawTNSSignal[period];
        this.data = response.data;
        this.rawData = response.data;
        this.signalStrength = response.data.map((item: CellularSignalModel) => {
          return { dateTime: item.dateTime, high: item.normHigh, low: item.normLow, tnsDeviceName: item.name };
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  downloadSignalReport = async (tnsDeviceName: string): Promise<string | undefined> => {
    const response = await CellularSignalService.downloadSignalReport(tnsDeviceName);
    try {
      if (response?.status === StatusCode.OK && response?.data) {
        this.signalReport = response.data;
        return response.data;
      }
    } catch (error) {
      console.warn(error);
    }
  };

  loadMostRecentSignal = async (tnsDeviceName: string): Promise<void> => {
    try {
      const response = await CellularSignalService.mostRecentSignal(tnsDeviceName);
      if (response?.status === StatusCode.OK && response?.data) {
        this.mostRecentSignal = response.data;
      }
    } catch (error) {
      console.warn(error);
    }
  };
}

const cellularSignal = new CellularSignal();

export default cellularSignal;
