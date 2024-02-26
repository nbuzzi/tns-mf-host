import { StatusCode } from "../../../helpers/api/RequestHelper";
import { MessageHelper } from "../../../helpers/shared/MessageHelper";
import { ConnectivityStatus } from "../../../interfaces/devices/devices";
import { DeviceService } from "../../../service/device/DeviceService";
import { store } from "../../../store/StoreMobx";

describe("Detail", () => {
  // Tests that an error message is displayed when loading device detail fails
  it("test_handle_error_when_loading_device_detail", async () => {
    const deviceServiceGetDetailSpy = jest.spyOn(DeviceService, "getDetail").mockRejectedValue(new Error());
    const messageHelperErrorMessageSpy = jest.spyOn(MessageHelper, "errorMessage").mockImplementation();
    const detail = store.device.detail;
    await detail.loadData("testDevice");
    expect(deviceServiceGetDetailSpy).toHaveBeenCalledWith("testDevice");
    expect(messageHelperErrorMessageSpy).toHaveBeenCalledWith("Error loading device detail");
  });

  // Tests that data is loaded successfully with valid tnsDeviceName
  it("test_load_data_successfully_with_valid_tns_device_name", async () => {
    const deviceServiceGetDetailSpy = jest.spyOn(DeviceService, "getDetail").mockResolvedValue({
      status: StatusCode.OK,
      data: {
        tnsDeviceName: "testDevice",
        acna: "testAcna",
        city: "testCity",
        company: "testCompany",
        country: "testCountry",
        connectivityStatus: ConnectivityStatus.indeterminate,
        customerDeviceName: "testCustomerDeviceName",
        knownAs: "testKnownAs",
        lanIpAddress: "testLanIpAddress",
        lanSubnetMask: "testLanSubnetMask",
        latitude: "testLatitude",
        longitude: "testLongitude",
        manufacturer: "testManufacturer",
        model: "testModel",
        operationalStatus: "testOperationalStatus",
        state: "testState",
        statusLastChangedOn: 1112255548,
        streetAddress: "testStreetAddress",
        streetAddress2: "testStreetAddress2",
        zipCode: "testZipCode"
      }
    });
    const detail = store.device.detail;
    await detail.loadData("testDevice");
    expect(deviceServiceGetDetailSpy).toHaveBeenCalledWith("testDevice");
    expect(detail.data?.tnsDeviceName).toEqual("testDevice");
  });

  // Tests that an error message is displayed when response status is other than OK
  it("test_handle_response_with_status_other_than_ok", async () => {
    const deviceServiceGetDetailSpy = jest.spyOn(DeviceService, "getDetail").mockResolvedValue({ status: StatusCode.BAD_REQUEST });
    const messageHelperErrorMessageSpy = jest.spyOn(MessageHelper, "errorMessage").mockImplementation();
    const detail = store.device.detail;
    await detail.loadData("testDevice");
    expect(deviceServiceGetDetailSpy).toHaveBeenCalledWith("testDevice");
    expect(messageHelperErrorMessageSpy).toHaveBeenCalledWith("Error loading device detail");
  });

  // Tests that an error message is displayed when response data is undefined
  it("test_handle_response_without_data", async () => {
    const deviceServiceGetDetailSpy = jest.spyOn(DeviceService, "getDetail").mockResolvedValue({ status: StatusCode.OK });
    const messageHelperErrorMessageSpy = jest.spyOn(MessageHelper, "errorMessage").mockImplementation();
    const detail = store.device.detail;
    await detail.loadData("testDevice");
    expect(deviceServiceGetDetailSpy).toHaveBeenCalledWith("testDevice");
    expect(messageHelperErrorMessageSpy).toHaveBeenCalledWith("Error loading device detail");
  });

  // Tests that data is not loaded when tnsDeviceName is undefined
  it("test_handle_loading_data_with_undefined_tns_device_name", async () => {
    const deviceServiceGetDetailSpy = jest.spyOn(DeviceService, "getDetail").mockResolvedValue({ status: StatusCode.OK });
    const detail = store.device.detail;
    await detail.loadData(undefined);
    expect(deviceServiceGetDetailSpy).toHaveBeenCalledTimes(4);
  });

  // Tests that data is not loaded when tnsDeviceName is empty
  it("test_handle_loading_data_with_empty_tns_device_name", async () => {
    const deviceServiceGetDetailSpy = jest.spyOn(DeviceService, "getDetail").mockResolvedValue({ status: StatusCode.OK });
    const detail = store.device.detail;
    await detail.loadData("");
    expect(deviceServiceGetDetailSpy).toHaveBeenCalledTimes(4);
  });
});
