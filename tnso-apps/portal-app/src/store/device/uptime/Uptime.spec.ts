import { MessageHelper } from "../../../helpers/shared/MessageHelper";
import { StatusCode } from "../../../helpers/api/RequestHelper";
import { Day, Month, Months } from "../../../interfaces/devices/chart/chart";
import { UptimeService } from "../../../service/device/deviceDetail/UptimeService";
import { store } from "../../../store/StoreMobx";

describe("UptimeStore", () => {
  // Tests that loadDataMonthly does not load data when tnsDeviceName is not provided
  it("test_load_data_monthly_no_device_name", async () => {
    const uptime = store.device.uptime;
    await uptime.loadDataMonthly();
    expect(uptime.dataMonthly).toBeUndefined();
  });

  // Tests that loadDataMonthly loads data when tnsDeviceName is provided
  it("test_load_data_monthly_success", async () => {
    const mockResponse: Month[] = [{ month: Months.April, tnsDeviceName: "device1", uptime: 99.9, year: "2022" }];
    UptimeService.getMonthly = jest.fn().mockResolvedValue({ data: mockResponse, status: StatusCode.OK });
    const uptime = store.device.uptime;
    await uptime.loadDataMonthly("device1");
    expect(uptime.dataMonthly).toEqual(mockResponse);
  });

  // Tests that loadDataDaily loads data when tnsDeviceName and month are provided
  // Tests that loadDataDaily does not load data when tnsDeviceName or month are not provided
  it("test_load_data_daily_no_device_name", async () => {
    const uptime = store.device.uptime;
    await uptime.loadDataDaily();
    expect(uptime.dataDaily).toBeUndefined();
  });

  it("test_load_data_daily_success", async () => {
    const mockResponse: Day[] = [
      {
        day: "2022-04-01",
        tnsDeviceName: "device1",
        uptime: 99.9,
        year: "2022",
        month: "April"
      }
    ];
    UptimeService.getDaily = jest.fn().mockResolvedValue({ data: mockResponse, status: StatusCode.OK });
    const uptime = store.device.uptime;
    await uptime.loadDataDaily("device1", "April");
    expect(uptime.dataDaily).toEqual(mockResponse);
  });
});
