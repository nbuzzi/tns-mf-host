import { Key } from "rc-tree/lib/interface";
import { ConnectivityStatus, ServiceStatus } from "../../interfaces/devices/devices";
import { Geolocation } from "../../interfaces/devices/geolocation/geolocation";
import { Group } from "../../interfaces/devices/group/group";

export class DeviceHelper {
  static calculateStatus(devices: Geolocation[]): ConnectivityStatus {
    const hasOffline = devices.some((device) => device.connectivityStatus === ConnectivityStatus.offline);
    const hasBackup = devices.some((device) => device.connectivityStatus === ConnectivityStatus.onBackup);
    const hasOnPrimary = devices.some((device) => device.connectivityStatus === ConnectivityStatus.onPrimary);
    const hasIndeterminate = devices.some((device) => device.connectivityStatus === ConnectivityStatus.indeterminate);

    if (hasOffline) {
      return ConnectivityStatus.offline;
    }
    if (hasIndeterminate) {
      return ConnectivityStatus.indeterminate;
    }
    if (hasBackup) {
      return ConnectivityStatus.onBackup;
    }
    if (hasOnPrimary) {
      return ConnectivityStatus.onPrimary;
    }
    return ConnectivityStatus.unknown;
  }

  static normalizedStatusName(status: ConnectivityStatus): string {
    return status[0].toLowerCase() + status.slice(1).split(" ").join("");
  }

  static filterMarkersByStatus(deviceLocation: Geolocation[], statuses: ConnectivityStatus[]): Geolocation[] {
    return deviceLocation.filter((device) => statuses.includes(device.connectivityStatus));
  }

  static devicesStatusCalculate(groups: Group[], checkedDevicesKeys: Key[]): ServiceStatus {
    const newGroupsStatus = groups.filter((group) => {
      return checkedDevicesKeys.includes(group.acna);
    });

    const statuses: ServiceStatus = {
      onPrimary: 0,
      offline: 0,
      indeterminate: 0,
      onBackup: 0,
      unknown: 0
    };

    const newStatusesQty: ServiceStatus = newGroupsStatus.reduce(function (statuses, group) {
      return {
        onPrimary: statuses.onPrimary + (group.connectivityStatus?.onPrimary ?? 0),
        offline: statuses.offline + (group.connectivityStatus?.offline ?? 0),
        indeterminate: statuses.indeterminate + (group.connectivityStatus?.indeterminate ?? 0),
        onBackup: statuses.onBackup + (group.connectivityStatus?.onBackup ?? 0),
        unknown: statuses.unknown + (group.connectivityStatus?.unknown ?? 0)
      };
    }, statuses);

    return newStatusesQty;
  }

  static arrayOfStatusAvailables(devicesStatus: ServiceStatus): ConnectivityStatus[] {
    const arrayOfAllowedStatus = Object.keys(ConnectivityStatus).filter((status) => devicesStatus[status as keyof ServiceStatus]) as ConnectivityStatus[];
    return (["onPrimary", "offline", "indeterminate", "onBackup", "unknown"] as ConnectivityStatus[]) ?? arrayOfAllowedStatus;
  }
}
