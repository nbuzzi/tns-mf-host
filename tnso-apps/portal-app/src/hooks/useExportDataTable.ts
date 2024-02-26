import { BuilderParams } from "../helpers/api/RequestHelper";
import { ExportXLSLHelper, TypeFile } from "../helpers/shared/ExportXLSLHelper";
import { Response } from "../interfaces/api/api";
import { QueryParams } from "../interfaces/shared/queryParams";
import { utils } from "xlsx";

/**
 * @description the hook to export the data table
 * @template T the type of the data
 * @template Q the type of the data to export
 * @param {number} totalRecords the total records of the table without filters
 * @param {number} pageSize the number of records per page
 * @param {function} methodToFetchData the method to fetch the data
 * @param {function} builderParams the method to build the params
 * @param {string} fileName the name of the file to export
 * @param {function} setTotalSheets the method to set the total sheets
 * @param {function} setShowModal the method to set the show modal
 * @param {function} setCurrentSheet the method to set the current sheet
 * @param {function} mapperMethod the method to map the data
 * @returns {void}
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ServiceWithoutSpecialParams<T = any> {
  getAll: (params?: QueryParams) => Promise<Response<T> | undefined>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ServiceWithDeviceName<T = any> {
  getAll: (deviceName: string, params?: QueryParams) => Promise<Response<T> | undefined>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ServiceWithCompanyProfileName<T = any> {
  getAll: (companyProfileName: string, params?: QueryParams) => Promise<Response<T> | undefined>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ServiceWithUsername<T = any> {
  getAll: (username: string, params?: QueryParams) => Promise<Response<T> | undefined>;
}

export function useExportDataTable<Q extends object, R extends object>(
  totalRecords: number,
  pageSize: number,
  fetchData: ServiceWithoutSpecialParams<R> | ServiceWithDeviceName<R> | ServiceWithCompanyProfileName<R> | ServiceWithUsername<R>,
  builderParams: (params: BuilderParams) => QueryParams,
  fileName: string,
  mapperMethod?: (data?: R) => Q[],
  isSpecialParams?: boolean,
  specialParams?: string
): () => Promise<void> {
  const handleExport = async (): Promise<void> => {
    const totalRequest = Math.ceil(totalRecords / pageSize);
    const totalPages = Array.from(Array(totalRequest).keys());
    const wb = utils.book_new();
    let dataToExport: Q[] = [];
    for (const [index] of totalPages.entries()) {
      let response: Response<R> | undefined;
      const params = builderParams({ currentPage: index });
      if (isSpecialParams && specialParams) {
        const fetch = fetchData as ServiceWithDeviceName<R> | ServiceWithCompanyProfileName<R> | ServiceWithUsername<R>;
        response = await fetch.getAll(specialParams, { ...params, startAtRecord: params.startAtRecord, recordsPerPage: params.recordsPerPage ?? pageSize });
      } else {
        const fetch = fetchData as ServiceWithoutSpecialParams<R>;
        response = await fetch.getAll({ ...params, startAtRecord: params.startAtRecord, recordsPerPage: params.recordsPerPage ?? pageSize });
      }
      if (response?.data) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        mapperMethod ? (dataToExport = [...dataToExport, ...mapperMethod(response?.data)]) : (dataToExport = [...dataToExport, ...(response?.data as Q[])]);
      }
      if (index === totalPages.length - 1) {
        ExportXLSLHelper.addSheetToBook<Q>(wb, dataToExport, 1);
        ExportXLSLHelper.exportToXLSL(wb, fileName, TypeFile.CSV);
        return;
      }
    }
  };
  return handleExport;
}
