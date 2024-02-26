import { MonthlyView } from "../../components/device/uptime/UptimeChart";
import { Month, Months } from "../../interfaces/devices/chart/chart";
import { UptimeHelper } from "./UptimeHelper";

describe("UptimeHelper", () => {
  it("formatUptime", () => {
    const number = 5.552222222333355;
    const isMonthly = false;

    const expected = "6";
    const result = UptimeHelper.formatUptime(number, isMonthly);

    expect(expected).toEqual(result);
  });

  it("formatUptime", () => {
    const number = 5.552222222333355;
    const isMonthly = true;

    const expected = "5.55%";
    const result = UptimeHelper.formatUptime(number, isMonthly);

    expect(expected).toEqual(result);
  });

  it("should return undefined if input array is undefined", () => {
    const result = UptimeHelper.sortedData(undefined);
    expect(result).toBeUndefined();
  });

  it("should return a new array sorted by year and month", () => {
    const data: Month[] = [
      { month: Months.January, year: "2021", uptime: 5.552222222333355, tnsDeviceName: "Device 1" },
      { year: "2020", month: Months.December, uptime: 5.552222222333355, tnsDeviceName: "Device 2" },
      { year: "2021", month: Months.February, uptime: 5.552222222333355, tnsDeviceName: "Device 3" }
    ];
    const expected: Month[] = [
      { year: "2020", month: Months.December, uptime: 5.552222222333355, tnsDeviceName: "Device 2" },
      { year: "2021", month: Months.January, uptime: 5.552222222333355, tnsDeviceName: "Device 1" },
      { year: "2021", month: Months.February, uptime: 5.552222222333355, tnsDeviceName: "Device 3" }
    ];

    const result = UptimeHelper.sortedData(data);
    expect(result).toEqual(expected);
  });

  it("should return undefined if data parameter is undefined", () => {
    expect(UptimeHelper.showByMonth(MonthlyView.SixMonths, undefined)).toBeUndefined();
  });

  it("should return the entire array of months if monthly view is TwelveMonths", () => {
    const data: Month[] = [
      { year: "2020", month: Months.December, uptime: 5.552222222333355, tnsDeviceName: "Device 2" },
      { year: "2021", month: Months.January, uptime: 5.552222222333355, tnsDeviceName: "Device 1" },
      { year: "2021", month: Months.February, uptime: 5.552222222333355, tnsDeviceName: "Device 3" },
      { year: "2021", month: Months.March, uptime: 5.552222222333355, tnsDeviceName: "Device 4" },
      { year: "2021", month: Months.April, uptime: 5.552222222333355, tnsDeviceName: "Device 5" },
      { year: "2021", month: Months.May, uptime: 5.552222222333355, tnsDeviceName: "Device 6" },
      { year: "2021", month: Months.June, uptime: 5.552222222333355, tnsDeviceName: "Device 7" },
      { year: "2021", month: Months.July, uptime: 5.552222222333355, tnsDeviceName: "Device 8" },
      { year: "2021", month: Months.August, uptime: 5.552222222333355, tnsDeviceName: "Device 9" },
      { year: "2021", month: Months.September, uptime: 5.552222222333355, tnsDeviceName: "Device 10" },
      { year: "2021", month: Months.October, uptime: 5.552222222333355, tnsDeviceName: "Device 11" },
      { year: "2021", month: Months.November, uptime: 5.552222222333355, tnsDeviceName: "Device 12" }
    ];
    expect(UptimeHelper.showByMonth(MonthlyView.TwelveMonths, data)).toEqual(data);
  });

  it("should return the last 6 months of the array if monthly view is not TwelveMonths", () => {
    const data: Month[] = [
      { year: "2020", month: Months.December, uptime: 5.552222222333355, tnsDeviceName: "Device 2" },
      { year: "2021", month: Months.January, uptime: 5.552222222333355, tnsDeviceName: "Device 1" },
      { year: "2021", month: Months.February, uptime: 5.552222222333355, tnsDeviceName: "Device 3" },
      { year: "2021", month: Months.March, uptime: 5.552222222333355, tnsDeviceName: "Device 4" },
      { year: "2021", month: Months.April, uptime: 5.552222222333355, tnsDeviceName: "Device 5" },
      { year: "2021", month: Months.May, uptime: 5.552222222333355, tnsDeviceName: "Device 6" },
      { year: "2021", month: Months.June, uptime: 5.552222222333355, tnsDeviceName: "Device 7" },
      { year: "2021", month: Months.July, uptime: 5.552222222333355, tnsDeviceName: "Device 8" },
      { year: "2021", month: Months.August, uptime: 5.552222222333355, tnsDeviceName: "Device 9" },
      { year: "2021", month: Months.September, uptime: 5.552222222333355, tnsDeviceName: "Device 10" },
      { year: "2021", month: Months.October, uptime: 5.552222222333355, tnsDeviceName: "Device 11" },
      { year: "2021", month: Months.November, uptime: 5.552222222333355, tnsDeviceName: "Device 12" }
    ];
    const monthlyView = MonthlyView.SixMonths;
    const lastSixMonths = data.slice(Math.max(0, data.length - 6), data.length);
  
    const result = UptimeHelper.showByMonth(monthlyView, data);
  
    expect(result).toEqual(lastSixMonths);
  });

  it("should return all available months when data length is less than 6", () => {
    const data: Month[] = [
      { year: "2020", month: Months.December, uptime: 5.552222222333355, tnsDeviceName: "Device 2" },
      { year: "2021", month: Months.January, uptime: 5.552222222333355, tnsDeviceName: "Device 1" },
      { year: "2021", month: Months.February, uptime: 5.552222222333355, tnsDeviceName: "Device 3" },
      { year: "2021", month: Months.March, uptime: 5.552222222333355, tnsDeviceName: "Device 4" }
    ];
    const monthlyView = MonthlyView.SixMonths;

    const result = UptimeHelper.showByMonth(monthlyView, data);
  
    expect(result).toEqual(data);
  });

  it("should return a sorted array based on months", () => {
    const data: Month[] = [
      { year: "2021", month: Months.January, uptime: 5.552222222333355, tnsDeviceName: "Device 1" },
      { year: "2021", month: Months.March, uptime: 5.552222222333355, tnsDeviceName: "Device 3" },
      { year: "2021", month: Months.February, uptime: 5.552222222333355, tnsDeviceName: "Device 2" }
    ];
    const expected: Month[] = [
      { year: "2021", month: Months.January, uptime: 5.552222222333355, tnsDeviceName: "Device 1" },
      { year: "2021", month: Months.February, uptime: 5.552222222333355, tnsDeviceName: "Device 2" },
      { year: "2021", month: Months.March, uptime: 5.552222222333355, tnsDeviceName: "Device 3" }
    ];
  
    const result = UptimeHelper.sortedData(data);
    expect(result).toEqual(expected);
  });

  
  // Tests that the sortedUptimeDataForDropdown() method correctly sorts the uptime data for dropdown options
  it("test_sorted_uptime_data_for_dropdown_happy_path", () => {
    const data = [
      { tnsDeviceName: "Device 1", month: Months.January, year: "2022", uptime: 99 },
      { tnsDeviceName: "Device 2", month: Months.March, year: "2021", uptime: 95 },
      { tnsDeviceName: "Device 3", month: Months.February, year: "2022", uptime: 98 }
    ];
    const expected = [
      { tnsDeviceName: "Device 3", month: Months.February, year: "2022", uptime: 98 },
      { tnsDeviceName: "Device 1", month: Months.January, year: "2022", uptime: 99 },
      { tnsDeviceName: "Device 2", month: Months.March, year: "2021", uptime: 95 }
    ];
    const result = UptimeHelper.sortedDataForDropdown(data);
    expect(result).toEqual(expected);
  });
});
