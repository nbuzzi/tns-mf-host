import { Device } from "../../interfaces/devices/devices";
import { LVCTable } from "../../interfaces/devices/lvc/lvc";

export class OrderColumnsHelper {
  public static orderColumnDeviceGroup(devices: Device[]): Device[] {
    const devicesOrdered = devices.map((device) => ({
      hasGeolocation: device.hasGeolocation,
      acna: device.acna,
      knownAs: device.knownAs,
      connectivityStatus: device.connectivityStatus,
      country: device.country,
      customerDeviceName: device.customerDeviceName,
      operationalStatus: device.operationalStatus,
      tnsDeviceName: device.tnsDeviceName
    }));
    return devicesOrdered;
  }

  public static orderColumnLvcGroup(lvcItems: LVCTable[]): LVCTable[] {
    const lvcOrdered = lvcItems.map((items) => ({
      lvcTicketNumber: items.lvcTicketNumber,
      status: items.status,
      devices: items.devices,
      startDate: items.startDate,
      ep1Acna: items.ep1Acna,
      ep1Host: items.ep1Host,
      ep1RealIp: items.ep1RealIp,
      knowsEp2As: items.knowsEp2As,
      ep2Acna: items.ep2Acna,
      ep2Host: items.ep2Host,
      ep2RealIp: items.ep2RealIp,
      knowsEp1As: items.knowsEp1As,
    }));
    return lvcOrdered;
  }
}
