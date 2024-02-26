import React, { FC, useCallback, useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { DeviceHelper } from '../../helpers/device/DeviceHelper';
import {
  ConnectivityStatus,
  ServiceStatus,
} from '../../interfaces/devices/devices';
import { store } from '../../store/StoreMobx';
import { observer } from 'mobx-react';
import { builderDeviceQueryParams } from '../../store/device/tableConfig';
import { TRANSLATION } from '../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

export interface CheckAllStatusProps {
  status: ServiceStatus;
  toggleSelectedStatuses: () => void;
  selectedStatuses?: ConnectivityStatus[];
}

export const CheckAllStatus: FC<CheckAllStatusProps> = observer(
  ({ status, selectedStatuses, toggleSelectedStatuses }): JSX.Element => {
    const { devices } = store;
    const { geolocation } = store.device;
    const statusAvailablesToCheck =
      DeviceHelper.arrayOfStatusAvailables(status);
    const statusesChecked = selectedStatuses?.filter((status) =>
      statusAvailablesToCheck?.includes(status)
    );
    const statusAmount = Object.values(status).reduce((a, b) => a + b, 0);
    const allStatuses = Object.values(ConnectivityStatus);

    const [isAllStatusesCheckedState, setIsAllStatusesCheckedState] =
      useState<boolean>(true);

    const handleFilters = useCallback(async (): Promise<void> => {
      if (!isAllStatusesCheckedState) {
        const queryParams = builderDeviceQueryParams({
          selectedStatuses: allStatuses,
        });
        await devices.loadData({ ...queryParams });
        await geolocation.loadData({ ...queryParams });
        devices.setCurrentPage(1);
      }
      toggleSelectedStatuses();
      setIsAllStatusesCheckedState(!isAllStatusesCheckedState);
    }, [
      toggleSelectedStatuses,
      devices.loadData,
      geolocation.loadData,
      isAllStatusesCheckedState,
      allStatuses,
    ]);

    useEffect(() => {
      setIsAllStatusesCheckedState(
        (statusesChecked &&
          statusAvailablesToCheck &&
          statusesChecked?.length >= statusAvailablesToCheck.length) ??
          false
      );
    }, [statusesChecked, statusAvailablesToCheck]);

    return (
      <div className="select-all mb-2">
        <Checkbox
          checked={isAllStatusesCheckedState}
          disabled={statusAmount === 0}
          onClick={handleFilters}
          data-testid="checkbox-all-status"
        >
          <p>
            <Text
              text={
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICESTATUS
                  .selectAllConnectivityStatus
              }
            />
          </p>
        </Checkbox>
      </div>
    );
  }
);
