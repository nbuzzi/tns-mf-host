import React, { Key } from "react";
import type { DataNode } from "antd/lib/tree";
import { DevicesConnectionStatus, Group } from "../../interfaces/devices/group/group";
import { ItemMenu } from "../../components/treeMenu/ItemMenu";
import { DeviceGroupHelper } from "../device/DeviceGroupHelper";
import { IDevice } from "../../store/device/Device";
import { IGeolocation } from "../../store/device/geolocation/Geolocation";
import { IFilter } from "../../store/device/filter/Filter";
import { builderDeviceQueryParams } from "../../store/device/tableConfig";
import { ServiceStatus } from "../../interfaces/devices/devices";

export class TreeMenuHelper {
  static buildGroups(groups?: Group[]): DataNode[] {
    const dataGroups: DataNode[] = [];

    if (!groups) {
      return dataGroups;
    }

    groups.forEach((group) => {
      const newGroup: DataNode = {
        key: group.acna,
        children: [],
        title: <ItemMenu label={`${group.acna} - ${group.knownAs}`} group={group} devicesAmount={group.totalNumberOfDevices} id={group.acna} />
      };
      dataGroups.push(newGroup);
    });
    return dataGroups;
  }

  static async selectGroups(
    selectedKeys: Key[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: any,
    setLastSelected: (value: React.SetStateAction<DataNode | undefined>) => void,
    setCheckedKeys: (treeData: DataNode[]) => void,
    setGroupActiveData: (keyGroup: string) => void,
    setGroupSelectedData: (groups: React.Key[]) => void,
    filter: IFilter,
    devices: IDevice,
    geolocation: IGeolocation,
    totalGroups: number,
    checkedDevicesKeys?: React.Key[],
    lastSelected?: DataNode
  ): Promise<void> {
    let newCheckedDevicesKeys: DataNode[] = [];
    setLastSelected(info.selectedNodes[0]);
    if (selectedKeys.length === 0 && lastSelected) {
      newCheckedDevicesKeys = [lastSelected];
    } else {
      newCheckedDevicesKeys = [...info.selectedNodes];
    }
    if (checkedDevicesKeys) {
      const checkedNodes: DataNode[] = checkedDevicesKeys.map((device) => {
        return {
          key: device,
          children: [],
          title: ""
        };
      });
      newCheckedDevicesKeys = [...newCheckedDevicesKeys, ...checkedNodes];
    }
    const isSameGroups = newCheckedDevicesKeys.length === totalGroups;
    setCheckedKeys(newCheckedDevicesKeys);

    const groupAcnas: Key[] = DeviceGroupHelper.checkedAllDevices(newCheckedDevicesKeys);
    await this.asignedData(info, groupAcnas, devices, geolocation, filter, setGroupActiveData, setGroupSelectedData, isSameGroups);
  }

  static async checkGroups(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: any,
    setCheckedKeys: (treeData: DataNode[]) => void,
    devices: IDevice,
    geolocation: IGeolocation,
    filter: IFilter,
    totalGroups: number,
    setGroupActiveData: (keyGroup: string) => void,
    setGroupSelectedData: (groups: React.Key[]) => void
  ): Promise<void> {
    setCheckedKeys(info.checkedNodes);
    const isSameGroups = info.checkedNodes.length === totalGroups;
    let dataLocation: Geolocation[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info.checkedNodes.forEach((node: any) => {
      if (node.isLeaf) {
        dataLocation = [...dataLocation, node.title.props.location];
      }
    });
    const groupAcnas: Key[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info.checkedNodes.forEach((node: any) => {
      if (!node.isLeaf) {
        groupAcnas.push(node.key);
      }
    });
    dataLocation = [];
    await this.asignedData(info, groupAcnas, devices, geolocation, filter, setGroupActiveData, setGroupSelectedData, isSameGroups);
  }

  static async asignedData(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: any,
    groupAcnas: Key[],
    devices: IDevice,
    geolocation: IGeolocation,
    filter: IFilter,
    setGroupActiveData: (keyGroup: string) => void,
    setGroupSelectedData: (groups: React.Key[]) => void,
    isSameGroups: boolean
  ): Promise<void> {
    setGroupSelectedData(groupAcnas);
    filter.setFilteredDevicesData(devices.data?.devices, groupAcnas);
    if (info.node && info.node.key) {
      setGroupActiveData(info.node.key);
    }

    if (!groupAcnas || groupAcnas.length === 0) {
      devices.setDevices([]);
      geolocation.setLocation([]);
      devices.setDevicesStatus({
        indeterminate: 0,
        offline: 0,
        onBackup: 0,
        onPrimary: 0,
        unknown: 0
      });
    } else {
      const queryParams = builderDeviceQueryParams({ acnasKeys: groupAcnas, isSameGroups });
      if (!devices.selectedStatuses) {
        devices.setDevices([]);
        geolocation.setLocation([]);
      } else {
        await devices.loadData({ ...queryParams });
        await geolocation.loadData({ ...queryParams });
      }
      await devices.loadDevicesStatus({ ...queryParams });
    }
  }

  static getDonutMaxPercentage(
    onPrimary: number,
    onBackup: number,
    setMaxPercentage: (value: React.SetStateAction<number>) => void,
    setConnectionStatus: (value: React.SetStateAction<DevicesConnectionStatus | undefined>) => void,
    devicesStatus?: ServiceStatus
  ): void {
    const statuses = {
      onPrimary,
      onBackup
    };
    if (devicesStatus) {
      const amountOfDevices = Object.values(statuses).reduce((acc, curr) => acc + curr, 0);
      const totalOfDevices = Object.values(devicesStatus).reduce((acc, curr) => acc + curr, 0);
      if (devicesStatus.onPrimary === 0 && devicesStatus.onBackup === 0) {
        setMaxPercentage(0);
      } else {
        const percentage = (amountOfDevices / totalOfDevices) * 100;
        setMaxPercentage(Math.ceil(percentage));
      }
    }
    setConnectionStatus(devicesStatus);
  }
}
