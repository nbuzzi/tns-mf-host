import { store } from "../../../store/StoreMobx";
import { StatusCode } from "../../../helpers/api/RequestHelper";
import { LVCService } from "../../../service/device/deviceDetail/LVCService";
import { MessageHelper } from "../../../helpers/shared/MessageHelper";

describe("LVCStore", () => {
  // Tests that data is not loaded when tnsDeviceName is undefined
  it("test_handle_undefined_tnsDeviceName", async () => {
    const lvc = store.device.lvc;
    jest.spyOn(LVCService, "getAll").mockResolvedValue(undefined);
    await lvc.loadData(undefined, {});
    expect(lvc.data).toBeUndefined();
    expect(lvc.lvcs).toBeUndefined();
  });

  // Tests that data is not loaded when response data is undefined
  it("test_handle_undefined_response_data", async () => {
    const lvc = store.device.lvc;
    const mockResponse = {
      status: StatusCode.OK,
      data: undefined
    };
    jest.spyOn(LVCService, "getAll").mockResolvedValue(mockResponse);
    await lvc.loadData("tnsDeviceName", {});
    expect(lvc.data).toBeUndefined();
    expect(lvc.lvcs).toBeUndefined();
  });

  // Tests that data is not loaded when response status is invalid
  it("test_handle_invalid_response_status", async () => {
    const lvc = store.device.lvc;
    const mockResponse = {
      status: StatusCode.BAD_REQUEST,
      data: {
        totalRecords: 1,
        returnedRecords: 1,
        lvcs: [
          {
            ep1DeviceName: "ep1",
            ep2DeviceName: "ep2",
            ep1Acna: "acna1",
            ep2Acna: "acna2",
            lvcTicketNumber: "123",
            status: "active",
            startDate: 1626307200000,
            ep1Host: "host1",
            ep2Host: "host2",
            ep1RealIp: "ip1",
            ep2RealIp: "ip2",
            knowsEp2As: "as2",
            knowsEp1As: "as1"
          }
        ]
      }
    };
    jest.spyOn(LVCService, "getAll").mockResolvedValue(mockResponse);
    await lvc.loadData("tnsDeviceName", {});
    expect(lvc.data).toBeUndefined();
    expect(lvc.lvcs).toBeUndefined();
  });

  // Tests that data is loaded successfully with valid tnsDeviceName and queryParams
  it("test_load_data_successfully", async () => {
    const lvc = store.device.lvc;
    const mockResponse = {
      status: StatusCode.OK,
      data: {
        totalRecords: 1,
        returnedRecords: 1,
        lvcs: [
          {
            ep1DeviceName: "ep1",
            ep2DeviceName: "ep2",
            ep1Acna: "acna1",
            ep2Acna: "acna2",
            lvcTicketNumber: "123",
            status: "active",
            startDate: 1626307200000,
            ep1Host: "host1",
            ep2Host: "host2",
            ep1RealIp: "ip1",
            ep2RealIp: "ip2",
            knowsEp2As: "as2",
            knowsEp1As: "as1"
          }
        ]
      }
    };

    const mockConvert = [
      {
        ep1DeviceName: "ep1",
        ep2DeviceName: "ep2",
        ep1Acna: "acna1",
        ep2Acna: "acna2",
        lvcTicketNumber: "123",
        status: "active",
        startDate: 1626307200000,
        ep1Host: "host1",
        ep2Host: "host2",
        ep1RealIp: "ip1",
        ep2RealIp: "ip2",
        knowsEp2As: "as2",
        knowsEp1As: "as1",
        devices: "ep1 - ep2"
      }
    ];
    jest.spyOn(LVCService, "getAll").mockResolvedValue(mockResponse);
    await lvc.loadData("tnsDeviceName", {});
    expect(lvc.data).toEqual({ ...mockResponse.data, lvcs: mockConvert });
    expect(lvc.lvcs).toEqual(mockConvert);
  });

  // Tests that current page is set successfully
  it("test_set_current_page_successfully", () => {
    const lvc = store.device.lvc;
    lvc.setCurrentPage(1);
    expect(lvc.currentPage).toEqual(1);
  });

  // Tests that an error message is displayed when loading data fails
  it("test_handle_error_loading_data", async () => {
    const lvc = store.device.lvc;
    jest.spyOn(LVCService, "getAll").mockRejectedValue(new Error("error"));
    jest.spyOn(MessageHelper, "errorMessage").mockImplementation(() => {});
    await lvc.loadData("tnsDeviceName", {});
    expect(MessageHelper.errorMessage).toHaveBeenCalledWith("Error loading lvc");
  });
});
