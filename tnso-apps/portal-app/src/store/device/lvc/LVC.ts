import { makeAutoObservable } from 'mobx';
import { StatusCode } from '../../../helpers/api/RequestHelper';
import { MessageHelper } from '../../../helpers/shared/MessageHelper';
import { LVCData } from '../../../interfaces/devices/lvc/lvc';
import { LVCResponse } from '../../../interfaces/devices/response/response';
import { QueryParams } from '../../../interfaces/shared/queryParams';
import { LVCService } from '../../../service/device/deviceDetail/LVCService';

export interface ILVC {
  data?: LVCResponse;
  lvcs?: LVCData[];
  currentPage: number;
  activeFilters: Record<string, string>;

  loadData: (
    tnsDeviceName?: string,
    queryParams?: QueryParams
  ) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setActiveFiltersData: (keyFilter: string, valueFilter: string) => void;
}

class LVC implements ILVC {
  data?: LVCResponse = undefined;
  lvcs?: LVCData[] = undefined;
  currentPage = 1;
  activeFilters: Record<string, string> = {};

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (
    tnsDeviceName?: string,
    queryParams?: QueryParams
  ): Promise<void> => {
    try {
      if (tnsDeviceName) {
        const response = await LVCService.getAll(tnsDeviceName, queryParams);
        if (response?.status === StatusCode.OK && response?.data) {
          const lvcs = response.data.lvcs?.map((lvcItem: LVCData) => ({
            ...lvcItem,
            devices: `${lvcItem.ep1DeviceName} - ${lvcItem.ep2DeviceName}`,
          }));
          this.data = { ...response.data, lvcs };
          this.lvcs = lvcs;
        }
      }
    } catch (error) {
      MessageHelper.errorMessage('Error loading lvc');
    }
  };

  setCurrentPage = (page: number): void => {
    this.currentPage = page;
  };

  setActiveFiltersData = (keyFilter: string, valueFilter: string): void => {
    this.activeFilters[keyFilter] = valueFilter;
  };
}

const lvc = new LVC();

export default lvc;
