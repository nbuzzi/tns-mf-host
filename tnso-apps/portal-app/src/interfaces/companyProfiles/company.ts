import { ACNA } from "./acna/acna";

export interface CompanyProfileResponse {
  totalRecords: number;
  returnedRecords: number;
  companyProfiles: CompanyProfileWithACNAs[];
}

export interface CompanyAvailable {
  available?: boolean;
}

export interface CompanyProfile extends CompanyAvailable {
  name: string;
  acnas?: string;
  note: string;
  canBeDeleted?: boolean;
  canBeEdited?: boolean;
}

export interface CompanyProfileWithACNAs {
  name: string;
  acnas?: ACNA[];
  note: string;
  canBeDeleted?: boolean;
  canBeEdited?: boolean;
}

export interface CompanyProfileWithACNAsForm {
  name: string;
  acnas?: ACNA[];
  note?: string;
  canBeDeleted?: boolean;
}

export interface UserAssociatedCompanyTable {
  name: string;
}
