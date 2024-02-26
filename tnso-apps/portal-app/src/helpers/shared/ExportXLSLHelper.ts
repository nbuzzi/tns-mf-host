import { writeFile, utils, WorkBook } from "xlsx";
export interface ExportData<T = unknown> {
  sheet: T[];
}

export enum TypeFile {
  CSV = "csv",
  XLSX = "xlsx"
}
export class ExportXLSLHelper {
  static totalPages = 0;
  static currentPage = 0;

  static parseCsvString(csvString: string): Record<string, string>[] {
    const lines = csvString.trim().split("\n");
    const header = lines
      .shift()
      ?.split(",")
      .map((property) => property.replace(/"/g, ""));
    const data = lines.map((line) => {
      const values = line.split(",");
      const obj: Record<string, string> = {};
      header?.forEach((property: string, index: number) => {
        obj[property] = values[index];
      });
      return obj;
    });
    return data;
  }

  static addSheetToBook<T = unknown>(wb: WorkBook, dataSheet: T[], namePage: number | string): void {
    const ws = utils.json_to_sheet(dataSheet);
    utils.book_append_sheet(wb, ws, `Page_${namePage}`);
  }

  static exportToXLSL(wb: WorkBook, fileName: string, typeFile?: TypeFile): void {
    writeFile(wb, `${fileName}.${typeFile ?? TypeFile.XLSX}`);
  }
}
