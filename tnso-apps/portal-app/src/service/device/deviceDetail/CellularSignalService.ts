import { Response } from "../../../interfaces/api/api";
import { CellularSignal, Period } from "../../../interfaces/devices/cellular/cellularSignal";
import { BaseService } from "../../../service/BaseService";

export class CellularSignalService extends BaseService {
  static async getTnsSignal(tnsDeviceName: string, period: Period): Promise<Response<CellularSignal[]> | undefined> {
    return this.get<CellularSignal[]>(`devices/${tnsDeviceName}/tnsSignal/${period}`);
  }

  static async downloadSignalReport(tnsDeviceName: string): Promise<Response<string> | undefined> {
    return this.get<string>(`devices/${tnsDeviceName}/signalReport`);
  }

  static async mostRecentSignal(tnsDeviceName: string): Promise<Response<CellularSignal> | undefined> {
    return this.get<CellularSignal>(`devices/${tnsDeviceName}/mostRecentSignal`);
  }
}
