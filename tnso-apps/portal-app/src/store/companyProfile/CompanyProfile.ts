import { makeAutoObservable } from "mobx";
import { StatusCode } from "../../helpers/api/RequestHelper";
import { MessageHelper } from "../../helpers/shared/MessageHelper";
import { CompanyAvailable, CompanyProfile as CompanyProfileModel, CompanyProfileResponse, CompanyProfileWithACNAs } from "../../interfaces/companyProfiles/company";
import { QueryParams } from "../../interfaces/shared/queryParams";
import { CompanyProfileService } from "../../service/companyProfile/CompanyProfileService";
import { TRANSLATION } from "../../../src/utils/const/translation";
import { i18nInstance as i18n } from "../../i18n";

import { store } from "../StoreMobx";
import { MapperHelper } from "../../helpers/shared/MapperHelper";
export interface ICompanyProfile extends CompanyProfileModel {
  data?: CompanyProfileResponse;
  availableData?: CompanyProfileResponse;
  associatedData?: CompanyProfileResponse;
  companyProfiles?: CompanyProfileWithACNAs[];
  companyProfile?: CompanyProfileWithACNAs;
  companyProfileModel?: CompanyProfileModel;
  prevParams?: QueryParams;
  companyNameSelected: string;
  available: boolean;
  isRequestInProgress: boolean;
  showModalDelete: boolean;

  loadData: (params?: QueryParams) => Promise<void>;
  loadDataByName: (name: string) => Promise<void>;
  loadAvailablesByUser: (username: string, params?: QueryParams) => Promise<void>;
  loadAssociatedByUser: (username: string, params?: QueryParams) => Promise<void>;
  getData: () => CompanyProfileWithACNAs[] | undefined;
  create: (companyProfile: CompanyProfileModel) => Promise<StatusCode | undefined>;
  update: (companyProfileName: string, companyProfile: CompanyProfileModel) => void;
  delete: (companyProfileName: string) => void;
  isAvailable: (companyProfileName: string) => Promise<CompanyAvailable | undefined>;
  setData: (companyProfile: CompanyProfileModel) => void;
  setCompanyName: (companyName: string) => void;
  setShowModalDelete: (showModalDelete: boolean) => void;
  cleanavailableDataAndAssociatedData: () => void;
  resetData: () => void;
}

class CompanyProfile implements ICompanyProfile {
  data?: CompanyProfileResponse = undefined;
  availableData?: CompanyProfileResponse = undefined;
  associatedData?: CompanyProfileResponse = undefined;
  companyProfiles?: CompanyProfileWithACNAs[] = undefined;
  companyProfile?: CompanyProfileWithACNAs;
  companyProfileModel?: CompanyProfileModel = undefined;
  name = "";
  acnas = "";
  note = "";
  companyNameSelected = "";
  canBeDeleted = false;
  prevParams?: QueryParams;
  available = true;
  isRequestInProgress = false;
  showModalDelete = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (params?: QueryParams): Promise<void> => {
    try {
      const response = await CompanyProfileService.getAll(params);
      if (response?.data) {
        this.data = response.data;
        this.companyProfiles = response.data.companyProfiles;
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.errorLoadingCompanyProfiles));
    }
  };

  loadDataByName = async (name: string): Promise<void> => {
    try {
      const response = await CompanyProfileService.getByName(name);
      if (response?.data) {
        this.companyProfile = response.data.companyProfiles[0];
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.errorLoadingCompanyProfiles));
    }
  };

  loadAvailablesByUser = async (username: string, params?: QueryParams): Promise<void> => {
    try {
      const response = await CompanyProfileService.getAvailablesByUser(username, params);
      if (response?.data) {
        this.availableData = response.data;
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.errorLoadingCompanyProfiles));
    }
  };

  loadAssociatedByUser = async (username: string, params?: QueryParams): Promise<void> => {
    try {
      const response = await CompanyProfileService.getAssociatedByUser(username, params);
      if (response?.data) {
        this.associatedData = response.data;
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.errorLoadingCompanyProfiles));
    }
  };

  getData = (): CompanyProfileWithACNAs[] | undefined => {
    return this.companyProfiles;
  };

  create = async (companyProfile: CompanyProfileModel): Promise<StatusCode | undefined> => {
    try {
      const result = await CompanyProfileService.create(companyProfile);
      if (result?.status === StatusCode.NO_CONTENT) {
        MessageHelper.successMessage(i18n.t(TRANSLATION.MODAL.ALERT.companyProfileCreatedSuccessfully));
        await store.acna.loadAvailablesByCompanyProfile(companyProfile.name, { startAtRecord: 0, recordsPerPage: 10 });
        await store.acna.loadAssociatedByCompanyProfile(companyProfile.name, { startAtRecord: 0, recordsPerPage: 10 });
      }
      return result?.status;
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.errorCreatingCompanyProfile));
    }
  };

  update = async (companyProfileName: string, companyProfile: CompanyProfileModel): Promise<void> => {
    try {
      await CompanyProfileService.update(companyProfileName, companyProfile);
      MessageHelper.successMessage(i18n.t(TRANSLATION.MODAL.ALERT.companyProfileUpdatedSuccessfully));
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.errorUpdatingCompanyProfile));
    }
  };

  delete = async (companyProfileName: string): Promise<void> => {
    try {
      const data = await CompanyProfileService.delete(companyProfileName);
      if (data && data.status === 200) {
        MessageHelper.successMessage(i18n.t(TRANSLATION.MODAL.ALERT.companyProfileDeletedSuccessfully));
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.errorDeletingCompanyProfile));
    }
  };

  isAvailable = async (companyProfileName: string): Promise<CompanyAvailable | undefined> => {
    try {
      if (companyProfileName !== "") {
        const response = await CompanyProfileService.isAvailable(companyProfileName);
        if (response?.data) {
          this.available = response.data.available ? true : false;
          return response.data;
        }
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.errorCheckingCompanyProfileName));
    }
  };

  setData = (companyProfile: CompanyProfileModel): void => {
    const acnas = companyProfile.acnas ? MapperHelper.acnasToAcnasWithKnownAs(companyProfile.acnas) : [];
    this.companyProfile = { ...companyProfile, acnas };
  };

  setShowModalDelete = (showModalDelete: boolean): void => {
    this.showModalDelete = showModalDelete;
  };

  setCompanyName = (companyName: string): void => {
    this.companyNameSelected = companyName;
  };

  cleanavailableDataAndAssociatedData = (): void => {
    this.availableData = undefined;
    this.associatedData = undefined;
  };

  resetData = (): void => {
    this.companyProfile = {
      name: "",
      acnas: [],
      note: "",
      canBeDeleted: false
    };
    this.name = "";
    this.acnas = "";
    this.note = "";
    this.data = undefined;
    store.acna.cleanavailableDataAndAssociatedData();
  };
}

const companyProfile = new CompanyProfile();

export default companyProfile;
