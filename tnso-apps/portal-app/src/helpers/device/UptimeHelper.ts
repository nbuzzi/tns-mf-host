import { MonthlyView } from "../../components/device/uptime/UptimeChart";
import { Month, Months } from "../../interfaces/devices/chart/chart";

interface MonthParsed {
  tnsDeviceName: string;
  month: Months;
  year: number;
  uptime: number;
}

export class UptimeHelper {
  /**
   * Formats the uptime value based on the specified format.
   *
   * @param {number} value - The uptime value to be formatted.
   * @param {boolean} isMonthly - A flag indicating whether the uptime value should be formatted as a monthly percentage.
   * @return {string} - The formatted uptime value.
   */
  static formatUptime(value: number, isMonthly: boolean): string {
    return isMonthly ? `${value.toFixed(2)}%` : `${value.toFixed(0)}`;
  }

  /**
   *
   * Sorts an array of `Month` objects by year and month, and returns a new sorted array.
   * @static
   * @param {Month[] | undefined} data - An array of `Month` objects to be sorted or undefined.
   * @returns {Month[] | undefined} - A new array of sorted `Month` objects, or undefined if the input array is undefined.
   *
   */
  static sortedData(data: Month[] | undefined): Month[] | undefined {
    if (data) {
      const months = Object.keys(Months).map((key) => Months[key as keyof typeof Months]);
      const dataParsed: MonthParsed[] = data.map((item) => {
        const year = Number(item.year);
        return { ...item, year: year };
      });

      dataParsed.sort((a, b) => {
        if (a.year > b.year) {
          return 1;
        }
        if (a.year < b.year) {
          return -1;
        }
        if (months.indexOf(a.month.toLowerCase() as Months) > months.indexOf(b.month.toLowerCase() as Months)) {
          return 1;
        }
        if (months.indexOf(a.month.toLowerCase() as Months) < months.indexOf(b.month.toLowerCase() as Months)) {
          return -1;
        }
        return 0;
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return dataParsed.map((item: any) => {
        return { ...item, year: item.year.toString() };
      });
    }
  }

  /**
   *
   * Returns an array of months based on a monthly view selection and an array of months.
   *
   * @static
   * @param {MonthlyView} monthly - The monthly view selection (enum value).
   * @param {Month[] | undefined} data - The array of months to filter.
   * @returns {Month[] | undefined} An array of months based on the monthly view selection or undefined if the data parameter is undefined.
   *
   */
  static showByMonth(monthly: MonthlyView, data: Month[] | undefined): Month[] | undefined {
    if (data) {
      if (monthly === MonthlyView.TwelveMonths) {
        return data;
      } else {
        return data.slice(Math.max(0, data.length - 6), data.length);
      }
    }
  }

  /**
   *
   * Returns an array of Months sorted by year and month in descending order,
   * with each year as a string, to be used in a dropdown menu.
   * @param {Month[] | undefined} data - An array of Month objects to be sorted.
   * @returns {Month[] | undefined} - An array of sorted Month objects, with year as a string, or undefined if input is undefined.
   *
   */
  static sortedDataForDropdown(data: Month[] | undefined): Month[] | undefined {
    if (data) {
      const months = Object.keys(Months).map((key) => Months[key as keyof typeof Months]);
      const dataParsed: MonthParsed[] = data.map((item) => {
        const year = Number(item.year);
        return { ...item, year: year };
      });

      dataParsed.sort((a, b) => {
        if (a.year < b.year) {
          return 1;
        }
        if (a.year > b.year) {
          return -1;
        }
        if (months.indexOf(a.month.toLowerCase() as Months) < months.indexOf(b.month.toLowerCase() as Months)) {
          return 1;
        }
        if (months.indexOf(a.month.toLowerCase() as Months) > months.indexOf(b.month.toLowerCase() as Months)) {
          return -1;
        }
        return 0;
      });

      return dataParsed.map((item) => {
        return { ...item, year: item.year.toString() };
      });
    }
  }
}
