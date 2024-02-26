import React, { DragEventHandler, useCallback } from 'react';
import { TRANSLATION } from '../../../src/utils/const/translation';
import { Group } from '../../interfaces/devices/group/group';
import { TreeMenuGroup } from './TreeMenuGroup';
import { Checkbox } from 'antd';
import { ConnectivityStatus } from '../../interfaces/devices/devices';
import { useAsyncCall } from '../../hooks/useAsyncCall';
import { store } from '../../store/StoreMobx';
import { observer } from 'mobx-react';
import { builderDeviceQueryParams } from '../../store/device/tableConfig';
import { TNSOCard } from '@tnso/ui-components/dist';
import i18n from 'i18n-module/i18n';
import Text from 'i18n-module/i18nModule';

export interface OnDropEvent extends DragEventHandler<HTMLDivElement> {
  target: {
    accessKey: string;
    textContent: string;
  };
  dataTransfer: DataTransfer;
  preventDefault: () => void;
}

export interface TreeMenuProps {
  groups?: Group[];
  totalRecords?: number;
}

export const Menu: React.FC<TreeMenuProps> = observer(({ groups }) => {
  const { devices, device, group } = store;
  const { geolocation } = store.device;

  const handleCheckAll = useCallback(async (): Promise<void> => {
    group.toggleAllCheckedDevices();
    sessionStorage.removeItem('groups');
  }, [group.toggleAllCheckedDevices]);

  const handleCheck = useCallback(async (): Promise<void> => {
    if (!group.isAllCheckedDevices) {
      device.filter.isFilteredTable = false;
      delete device.filter.activeFilters?.acnas;
      const params = builderDeviceQueryParams();
      delete params.acnas;
      await devices.loadDevicesStatus(params);
      group.setGroupSelected(group.groups?.map((g) => g.acna));
      if (devices.selectedStatuses && devices.selectedStatuses.length > 0) {
        if (
          devices.selectedStatuses.length !==
          Object.values(ConnectivityStatus).length
        ) {
          devices.toggleSelectedStatuses();
        }
        await Promise.all([
          devices.loadData(params),
          geolocation.loadData(params),
        ]);
      }
    } else {
      devices.setDevicesStatus();
    }
  }, [
    devices.loadData,
    group.isAllCheckedDevices,
    geolocation.loadData,
    devices.loadDevicesStatus,
    devices.setDevicesStatus,
    devices.selectedStatuses,
    devices.toggleSelectedStatuses,
  ]);

  useAsyncCall(async (): Promise<unknown> => {
    if (
      !group.isAllCheckedDevices &&
      groups?.length === group.checkedDevicesKeys?.length
    ) {
      await handleCheckAll();
    }
    return Promise.resolve();
  }, [
    handleCheckAll,
    group.isAllCheckedDevices,
    groups?.length,
    group.checkedDevicesKeys?.length,
  ]);

  return groups ? (
    <TNSOCard
      className="d-flex flex-column container-tree-menu"
      data-testid="treemenu-component"
    >
      <div className="text-center p-0 mb-3">
        <div className="row w-100">
          <div>
            <h5>
              <strong>
                <Text
                  text={TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.groups}
                />
              </strong>
            </h5>
          </div>
        </div>
      </div>
      <div className="select-all-menu d-flex gap-2">
        {handleCheckAll && (
          <Checkbox
            onChange={handleCheckAll}
            checked={group.isAllCheckedDevices}
            onClick={handleCheck}
            data-testid="treemenu-checkbox"
          />
        )}
        <h5 className="select-all">
          {`${i18n.t(
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.groupBy
          )} ${i18n.t(
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.FILTER[
              group.filterBy as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.FILTER
            ]
          )}`}
          <span> ({devices.totalDevices})</span>
        </h5>
      </div>
      <div className="divider-tree-menu mb-3" />
      <div className="container-tree-menu-group p-1">
        <TreeMenuGroup />
      </div>
    </TNSOCard>
  ) : null;
});
