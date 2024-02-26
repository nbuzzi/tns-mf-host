import React, { Key, useCallback, useEffect, useState } from "react";
import { Tree } from "antd";
import { Group } from "../../interfaces/devices/group/group";
import { DeviceGroupHelper } from "../../helpers/device/DeviceGroupHelper";
import type { DataNode, EventDataNode } from "antd/lib/tree";
import { ConnectivityStatus } from "../../interfaces/devices/devices";
import { Spinner, Stack } from "react-bootstrap";
import { DeviceHelper } from "../../helpers/device/DeviceHelper";
import { store } from "../../store/StoreMobx";
import { observer } from "mobx-react";
import { TreeMenuHelper } from "../../helpers/treeMenu/TreeMenuHelper";

export interface SelectProps {
  event: "select";
  selected: boolean;
  node: EventDataNode<DataNode>;
  selectedNodes: DataNode[];
  nativeEvent: MouseEvent;
}

export interface CustomGroup extends Group {
  acna: string;
  status: ConnectivityStatus;
  location: Location;
}

export const TreeMenuGroup: React.FC = observer((): JSX.Element => {
  const { devices, device, group } = store;
  const { geolocation, filter } = device;
  const [checked, setChecked] = useState<Key[]>();

  const handleGroups = useCallback(
    (groups?: Group[]): DataNode[] => {
      return TreeMenuHelper.buildGroups(groups);
    },
    [devices.data?.devices]
  );

  useEffect(() => setChecked(group.checkedDevicesKeys ?? []), [group.checkedDevicesKeys, group.isAllCheckedDevices]);

  useEffect(() => {
    group.setTreeDataGroups(handleGroups(group.groups));
  }, [group.groups, handleGroups, group.setTreeDataGroups]);

  useEffect(() => {
    if (group.groups && checked && !devices.devicesStatus) {
      const statuses = DeviceHelper.devicesStatusCalculate(group.groups, checked);
      devices.setDevicesStatus(statuses);
    }
  }, [group.groups, checked, devices.setDevicesStatus, devices.devicesStatus]);

  const onChecked = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (_: { checked: Key[]; halfChecked: Key[] } | Key[], info: any): Promise<void> => {
      await TreeMenuHelper.checkGroups(info, group.setCheckedKeys, devices, geolocation, filter, group.groups?.length ?? 0, group.setGroupActive, group.setGroupSelected);
    },
    [
      group.setCheckedKeys,
      group.setGroupActive,
      filter.setFilteredDevicesData,
      devices.data?.devices,
      devices.selectedStatuses,
      devices.loadData,
      group.setGroupSelected,
      geolocation.loadData,
      devices.setDevices,
      geolocation.setLocation,
      devices.loadDevicesStatus
    ]
  );

  // TODO - check this useEffect(send logic to GroupDeviceContext)
  useEffect(() => {
    if (group.isAllCheckedDevices) {
      const defaultChecked = DeviceGroupHelper.checkedAllDevices(group.treeDataGroups);
      setChecked(defaultChecked ?? []);
      if (!group.checkedDevicesKeys || group.checkedDevicesKeys.length === 0) {
        const defaultChecked = DeviceGroupHelper.checkedAllDevices(group.treeDataGroups);
        group.setCheckedDevicesKeys(defaultChecked);
      }
    }
  }, [group.checkedDevicesKeys, group.isAllCheckedDevices, group.treeDataGroups, group.setCheckedDevicesKeys]);

  // ! IMPORTANT - the arrow of the tree menus is hidden with 'display: none' in _treeMenu.scss, class .ant-tree-switcher
  return (
    <div data-testid="tree-menu-group">
      {group.treeDataGroups ? (
        <Tree checkable className="container-list" draggable checkedKeys={checked} treeData={group.treeDataGroups} onCheck={onChecked} />
      ) : (
        <Stack className="align-items-center">
          <Spinner size="sm" animation="border" variant="primary" data-testid="tree-menu-spinner" />
        </Stack>
      )}
    </div>
  );
});
