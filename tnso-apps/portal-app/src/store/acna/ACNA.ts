import { makeAutoObservable } from "mobx";
import { MessageHelper } from "../../helpers/shared/MessageHelper";
import { ACNA as ACNAModel, ACNAResponse } from "../../interfaces/companyProfiles/acna/acna";
import { QueryParams } from "../../interfaces/shared/queryParams";
import { ACNAService } from "../../service/acna/ACNAService";

export interface IACNA extends ACNAModel {
  data?: ACNAResponse;
  availableData?: ACNAResponse;
  associatedData?: ACNAResponse;
  acnas?: ACNAModel[];
  prevParams?: QueryParams;

  loadData: (params?: QueryParams) => Promise<void>;
  loadAvailablesByCompanyProfile: (companyProfileName: string, params?: QueryParams) => Promise<void>;
  loadAssociatedByCompanyProfile: (companyProfileName: string, params?: QueryParams) => Promise<void>;
  getData: () => ACNAModel[] | undefined;
  cleanavailableDataAndAssociatedData: () => void;
}

class ACNA implements IACNA {
  data?: ACNAResponse = undefined;
  availableData?: ACNAResponse = undefined;
  associatedData?: ACNAResponse = undefined;
  acnas?: ACNAModel[];
  name = "";
  knownAs = "";
  prevParams?: QueryParams;

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (params?: QueryParams): Promise<void> => {
    try {
      const response = await ACNAService.getAll(params);
      if (response?.data) {
        this.data = response.data;
        this.acnas = response.data.acnas;
      }
    } catch (error) {
      MessageHelper.errorMessage("Error loading ACNAs");
    }
  };

  loadAvailablesByCompanyProfile = async (companyProfileName: string, params?: QueryParams): Promise<void> => {
    try {
      const response = await ACNAService.getAvailablesByCompanyProfile(companyProfileName, params);
      if (response?.data) {
        this.availableData = response.data;
      }
    } catch (error) {
      MessageHelper.errorMessage("Error loading ACNAs");
    }
  };

  loadAssociatedByCompanyProfile = async (companyProfileName: string, params?: QueryParams): Promise<void> => {
    try {
      const response = await ACNAService.getAssociatedByCompanyProfile(companyProfileName, params);
      if (response?.data) {
        this.associatedData = response.data;
      }
    } catch (error) {
      MessageHelper.errorMessage("Error loading ACNAs");
    }
  };

  getData = (): ACNAModel[] | undefined => {
    return this.acnas;
  };

  cleanavailableDataAndAssociatedData = (): void => {
    this.availableData = undefined;
    this.associatedData = undefined;
  };
}

const acna = new ACNA();

export default acna;
