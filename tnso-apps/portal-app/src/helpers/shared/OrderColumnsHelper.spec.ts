import { ConnectivityStatus, Device } from "../../interfaces/devices/devices";
import { OrderColumnsHelper } from "./OrderColumnsHelper";
import { LVCTable } from "../../interfaces/devices/lvc/lvc";

describe("OrderColumnsHelper", () => {
  // Tests that orderColumnDeviceGroup returns an array of devices ordered by the specified properties
  it("test_order_column_device_group_returns_ordered_devices", () => {
    const devices: Device[] = [
      {
        country: "country1",
        acna: "acna1",
        connectivityStatus: ConnectivityStatus.onPrimary,
        hasGeolocation: true,
        knownAs: "knownAs1",
        customerDeviceName: "customerDeviceName1",
        operationalStatus: "operational",
        tnsDeviceName: "tnsDeviceName1"
      }
    ];
    const expected: Device[] = [
      {
        hasGeolocation: true,
        acna: "acna1",
        knownAs: "knownAs1",
        connectivityStatus: ConnectivityStatus.onPrimary,
        country: "country1",
        customerDeviceName: "customerDeviceName1",
        operationalStatus: "operational",
        tnsDeviceName: "tnsDeviceName1"
      }
    ];
    expect(OrderColumnsHelper.orderColumnDeviceGroup(devices)).toEqual(expected);
  });

  // Tests that orderColumnLvcGroup returns an array of LVC items ordered by the specified properties
  it("test_order_column_lvc_group_returns_ordered_lvc_items", () => {
    const lvcItems = [
      {
        devices: "devices1",
        ep1Acna: "ep1Acna1",
        ep2Host: "ep2Host1",
        ep1RealIp: "ep1RealIp1",
        status: "status1",
        startDate: 123456789,
        ep1Host: "ep1Host1",
        ep2RealIp: "ep2RealIp1",
        knowsEp2As: "knowsEp2As1",
        ep2Acna: "ep2Acna1",
        lvcTicketNumber: "lvcTicketNumber1",
        knowsEp1As: "knowsEp1As1"
      }
    ];
    const expected = [
      {
        lvcTicketNumber: "lvcTicketNumber1",
        status: "status1",
        devices: "devices1",
        startDate: 123456789,
        ep1Acna: "ep1Acna1",
        ep1Host: "ep1Host1",
        ep1RealIp: "ep1RealIp1",
        knowsEp2As: "knowsEp2As1",
        ep2Acna: "ep2Acna1",
        ep2Host: "ep2Host1",
        ep2RealIp: "ep2RealIp1",
        knowsEp1As: "knowsEp1As1"
      }
    ];
    expect(OrderColumnsHelper.orderColumnLvcGroup(lvcItems)).toEqual(expected);
  });

  // Tests that orderColumnDeviceGroup handles empty input array
  it("test_order_column_device_group_handles_empty_input_array", () => {
    const devices: Device[] = [];
    const expected: Device[] = [];
    expect(OrderColumnsHelper.orderColumnDeviceGroup(devices)).toEqual(expected);
  });

  // Tests that orderColumnLvcGroup handles empty input array
  it("test_order_column_lvc_group_handles_empty_input_array", () => {
    const lvcItems: LVCTable[] = [];
    const expected: LVCTable[] = [];
    expect(OrderColumnsHelper.orderColumnLvcGroup(lvcItems)).toEqual(expected);
  });
});
