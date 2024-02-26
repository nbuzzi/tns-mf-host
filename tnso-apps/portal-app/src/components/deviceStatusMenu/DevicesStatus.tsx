import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox } from 'antd';
import { TNSOCard } from '@tnso/ui-components/dist';
import { observer } from 'mobx-react';

import { store } from '../../store/StoreMobx';
import { ConnectivityStatus } from '../../interfaces/devices/devices';
import { COLORS } from '../../utils/const/colors';
import { DeviceHelper } from '../../helpers/device/DeviceHelper';
import { builderDeviceQueryParams } from '../../store/device/tableConfig';
import { TRANSLATION } from '../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

interface StatusProps {
  urlImage: string;
  status?: ConnectivityStatus;
  statusAmount?: number;
}

export const DevicesStatus: React.FC<StatusProps> = observer(
  ({
    urlImage,
    status = ConnectivityStatus.onBackup,
    statusAmount,
  }): JSX.Element => {
    const { devices } = store;
    const { geolocation } = store.device;
    const [statusColorText, setStatusColorText] = useState<string>(
      COLORS.DEVICES.STATUS.INDETERMINATE
    );
    const amount = useMemo(
      () =>
        Object.values(devices.devicesStatus ?? {}).reduce((a, b) => a + b, 0),
      [devices.devicesStatus]
    );

    const handleFilters = useCallback(async (): Promise<void> => {
      devices.setStatusFilters(status);
      const currentStatusSelected = devices.selectedStatuses ?? [status];
      if (currentStatusSelected && currentStatusSelected.length > 0) {
        let queryParams;

        if (devices.devicesStatus) {
          const statusAvailables = DeviceHelper.arrayOfStatusAvailables(
            devices.devicesStatus
          );
          const arrayOfStatus = currentStatusSelected.filter((item) =>
            statusAvailables.includes(item)
          );

          queryParams = builderDeviceQueryParams({
            selectedStatuses: arrayOfStatus,
          });
        } else {
          queryParams = builderDeviceQueryParams({
            selectedStatuses: currentStatusSelected,
          });
        }
        if (devices.selectedStatuses) {
          await devices.loadData(queryParams);
          await geolocation.loadData(queryParams);
        } else {
          devices.cleanDevicesAndGeolocations();
        }
      }
    }, [
      devices.setStatusFilters,
      status,
      devices.devicesStatus,
      devices.selectedStatuses,
      devices.loadData,
      geolocation.loadData,
    ]);

    const handleStatusColor = useCallback(() => {
      switch (status) {
        case ConnectivityStatus.onPrimary:
          setStatusColorText(COLORS.DEVICES.STATUS.ONPRIMARY);
          break;
        case ConnectivityStatus.offline:
          setStatusColorText(COLORS.DEVICES.STATUS.OFFLINE);
          break;
        case ConnectivityStatus.onBackup:
          setStatusColorText(COLORS.DEVICES.STATUS.ONBACKUP);
          break;
        case ConnectivityStatus.unknown:
          setStatusColorText(COLORS.DEVICES.STATUS.UNKNOWN);
          break;
        default:
          setStatusColorText(COLORS.DEVICES.STATUS.INDETERMINATE);
      }
    }, [status]);

    useEffect(() => handleStatusColor(), [handleStatusColor]);

    const statusItem = useMemo(() => {
      return (
        <TNSOCard
          className="button-status"
          data-cy={`status-checkbox-container-${status}`}
        >
          <Checkbox
            data-testid="checkbox-device-status"
            defaultChecked={devices.selectedStatuses?.includes(status)}
            onClick={handleFilters}
            disabled={amount === 0}
            data-cy={`status-checkbox-${status}`}
            checked={devices.selectedStatuses?.includes(status)}
          >
            <div className="v d-flex flex-row justify-content-center align-items-center ">
              <img src={urlImage} className="image-status" alt={status} />
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ color: `${statusColorText}`, whiteSpace: 'nowrap' }}
              >
                <small>
                  <Text
                    text={
                      TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICESTATUS[
                        status as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICESTATUS
                      ]
                    }
                  />
                </small>
                <small>{statusAmount ?? 0}</small>
              </div>
            </div>
          </Checkbox>
        </TNSOCard>
      );
    }, [
      handleFilters,
      devices.selectedStatuses,
      status,
      statusAmount,
      statusColorText,
      urlImage,
      amount,
    ]);

    return statusItem;
  }
);
