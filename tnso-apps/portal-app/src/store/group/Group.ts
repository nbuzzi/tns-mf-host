import { DataNode } from "rc-tree/lib/interface";
import { Key } from "react";
import { GroupFilters, Group as GroupModel } from "../../interfaces/devices/group/group";
import { DeviceGroupHelper } from "../../helpers/device/DeviceGroupHelper";
import { store } from "../StoreMobx";
import { GroupService } from "../../service/device/GroupService";
import { makeAutoObservable } from "mobx";
import _ from "lodash";

export interface IGroup {
  groups?: GroupModel[];
  groupActive?: string;
  groupSelected?: Key[];
  treeDataGroups?: DataNode[];
  allTreeDataGroups?: DataNode[];
  isAllCheckedDevices?: boolean;
  checkedDevicesKeys?: Key[];
  filterBy: string;

  loadData: (params?: string) => Promise<void>;
  getIsActiveGroup: () => string | null;
  setIsAllCheckedDevices: (isCheckedDevices: boolean) => void;
  setGroupActive: (keyGroup: string) => void;
  setGroupsFilterBy: (filter: string) => void;
  setGroupSelected: (groups?: Key[]) => void;
  setGroups: (groups: GroupModel[] | undefined) => void;
  setTreeDataGroups: (treeData: DataNode[]) => void;
  setCheckedDevicesKeys: (key?: Key[]) => void;
  setCheckedKeys: (treeData: DataNode[]) => void;
  setIsAllChecked: () => void;
  setIsActiveGroup: (isActive?: boolean) => void;
  cleanTreeDataGroups: () => void;
  toggleAllCheckedDevices: () => void;
}

class Group implements IGroup {
  groups?: GroupModel[];
  groupActive?: string;
  groupSelected?: Key[];
  treeDataGroups?: DataNode[];
  allTreeDataGroups?: DataNode[];
  isAllCheckedDevices?: boolean;
  checkedDevicesKeys?: Key[];
  filterBy = GroupFilters.ACNA;

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (params?: string): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryParams: any = {};
    if (!this.groups) {
      if (params) {
        queryParams[params] = params;
      } else {
        this.setIsAllCheckedDevices(true);
      }
      const response = await GroupService.getAll(queryParams);
      if (response?.data) {
        this.setGroups(response.data);
        DeviceGroupHelper.setGroups(response.data);
        this.setIsActiveGroup();
      }
    }
  };

  getIsActiveGroup = (): string | null => {
    return localStorage.getItem("filterActive");
  };

  setIsAllCheckedDevices = (isCheckedDevices: boolean): void => {
    this.isAllCheckedDevices = isCheckedDevices;
  };

  setGroupActive = (keyGroup: string): void => {
    this.groupActive = keyGroup;
  };

  setGroupsFilterBy = (keyGroup: string): void => {
    this.filterBy = keyGroup as GroupFilters;
  };

  setGroupSelected = (groups?: Key[]): void => {
    this.groupSelected = groups;
  };

  setGroups = (groups: GroupModel[] | undefined): void => {
    this.groups = groups;
  };

  setTreeDataGroups = (treeData: DataNode[]): void => {
    this.treeDataGroups = treeData;
    if (_.isEqual(_.size(treeData), _.size(this.groups))) {
      this.allTreeDataGroups = treeData;
    }
  };

  setCheckedDevicesKeys = (key?: Key[]): void => {
    this.checkedDevicesKeys = key;
  };

  setCheckedKeys = (treeData: DataNode[]): void => {
    store.devices.setCurrentPage(1);
    const keysChecked = DeviceGroupHelper.checkedAllDevices(treeData);
    this.setIsAllCheckedDevices(false);
    if (keysChecked.length > 0) {
      this.setCheckedDevicesKeys(keysChecked);
    } else {
      this.setCheckedDevicesKeys(undefined);
      store.devices.cleanDevicesAndGeolocations();
    }
  };

  setIsAllChecked = (): void => {
    this.setCheckedKeys(this.treeDataGroups ?? []);
    this.setIsAllCheckedDevices(true);
  };

  setIsActiveGroup = (isActive?: boolean): void => {
    if (isActive) {
      localStorage.setItem("filterActive", "true");
    } else {
      localStorage.removeItem("filterActive");
    }
  };

  cleanTreeDataGroups = (): void => {
    this.treeDataGroups = undefined;
  };

  toggleAllCheckedDevices = (): void => {
    this.setCheckedDevicesKeys(undefined);
    if (!this.isAllCheckedDevices) {
      this.setCheckedKeys(this.allTreeDataGroups ?? []);
    } else {
      store.devices.cleanDevicesAndGeolocations();
    }
    this.setIsAllCheckedDevices(!this.isAllCheckedDevices);
  };
}

const group = new Group();

export default group;
