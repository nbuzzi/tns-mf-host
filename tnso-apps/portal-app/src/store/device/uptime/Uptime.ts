import { makeAutoObservable } from "mobx";
import { StatusCode } from "../../../helpers/api/RequestHelper";
import { MessageHelper } from "../../../helpers/shared/MessageHelper";
import { Day, Month } from "../../../interfaces/devices/chart/chart";
import { UptimeService } from "../../../service/device/deviceDetail/UptimeService";
import { TRANSLATION } from "../../../utils/const/translation";
import { i18nInstance as i18n } from "../../../i18n";


export interface IUptime {
  dataMonthly?: Month[];
  dataDaily?: Day[];

  loadDataMonthly: (tnsDeviceName?: string) => Promise<void>;
  loadDataDaily: (tnsDeviceName?: string, month?: string) => Promise<void>;
}

class Uptime implements IUptime {
  dataDaily?: Day[] | undefined;
  dataMonthly?: Month[] | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  loadDataMonthly = async (tnsDeviceName?: string): Promise<void> => {
    try {
      if (tnsDeviceName) {
        this.dataDaily = undefined;
        const response = await UptimeService.getMonthly(tnsDeviceName);
        if (response?.status === StatusCode.OK && response?.data) {
          this.dataMonthly = response.data;
        }
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.ERROR.errorLoadingUptimeMonthlyData));
    }
  };

  loadDataDaily = async (tnsDeviceName?: string, month?: string): Promise<void> => {
    try {
      if (tnsDeviceName && month) {
        this.dataMonthly = undefined;
        const response = await UptimeService.getDaily(tnsDeviceName, month);
        if (response?.status === StatusCode.OK && response?.data) {
          this.dataDaily = response.data;
        }
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.ERROR.errorLoadingUptimeMonthlyData));
    }
  };
}

const uptime = new Uptime();

export default uptime;
