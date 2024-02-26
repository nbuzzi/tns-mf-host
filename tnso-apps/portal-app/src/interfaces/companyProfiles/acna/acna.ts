export interface ACNAResponse {
  totalRecords: number;
  returnedRecords: number;
  acnas: ACNA[];
}

export interface ACNA {
  name: string;
  knownAs: string;
}
