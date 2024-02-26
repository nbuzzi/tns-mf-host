import { ColumnsType } from "antd/lib/table";
import { i18nInstance as i18n } from "../../i18n";
import { TRANSLATION } from "../../utils/const/translation";

export class TranslationHelper {
  public static columnsTranslation(columns: ColumnsType[]): ColumnsType[] {
    // eslint-disable-next-line
    return columns.map((column: any) => {
      return { ...column, title: i18n.t(TRANSLATION.SHARED.TABLE[column.title as keyof typeof TRANSLATION.SHARED.TABLE]) };
    });
  }

  static dataTranslation<T>(data: T[], keysTranslation: string[]): T[] {
    const dataTranslated = data.map((item) => {
      let obj = item as Record<string, string>;
      keysTranslation.forEach((key) => {
        obj = { ...obj, [key]: i18n.t(TRANSLATION.SHARED.DATATABLE[obj[key] as keyof typeof TRANSLATION.SHARED.DATATABLE] as keyof typeof TRANSLATION.SHARED.DATATABLE) };
      });
      return obj as T;
    });

    return dataTranslated;
  }
}
