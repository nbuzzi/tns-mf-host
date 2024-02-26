import React, { useEffect, useState } from 'react';
import { Device } from '../../interfaces/devices/devices';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../utils/const/translation';
import { COLORS } from '../../utils/const/colors';

import { store } from '../../store/StoreMobx';
import { observer } from 'mobx-react';
import { MostRecentSignal } from './cellularSignal/MostRecentSignal';
import { TNSOCard } from '@tnso/ui-components/dist';
interface HeaderDetailProps {
  tnsDeviceName?: string;
}

export const HeaderDetail: React.FC<HeaderDetailProps> = observer(
  ({ tnsDeviceName }) => {
    const { t } = useTranslation();
    const { detail, cellularUsage } = store.device;
    const { devices } = store;

    const [color, setColor] = useState<string>(
      COLORS.DEVICES.STATUS.INDETERMINATE
    );
    const [data, setData] = useState<Device | null>(null);

    useEffect(() => {
      if (devices.devices) {
        const device = devices.devices.find((device: Device) => {
          if (
            device.customerDeviceName === tnsDeviceName ||
            device.tnsDeviceName === tnsDeviceName
          ) {
            return device;
          }
          return null;
        });
        if (device) {
          setData(device);
        }
      }
    }, [devices, tnsDeviceName]);

    useEffect(() => {
      if (data || detail?.data) {
        const device = data ?? detail.data;
        const statusColor =
          COLORS.DEVICES.STATUS[
            device?.connectivityStatus.toUpperCase() as keyof typeof COLORS.DEVICES.STATUS
          ];
        setColor(statusColor);
      }
    }, [data, detail.data]);

    return data || detail?.data ? (
      <TNSOCard className="w-100 mt-2 p-0">
        <div className="row">
          <div className="col-auto px-3 device-name-container tns-status m-auto">
            <p className="col-auto bold title">
              {t(
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.DETAIL
                  .HEADER.tnsServiceStatus
              )}
              :
            </p>
            <p style={{ color: `${color}` }} className="data">
              {' '}
              {t(
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICESTATUS[
                  (data?.connectivityStatus ??
                    detail.data
                      ?.connectivityStatus) as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICESTATUS
                ]
              )}
            </p>
          </div>
          <div className="col col-lg-auto">
            <div className="divider" />
          </div>
          <div className="col-lg-auto m-auto device-name-container customer-name">
            <div className="row">
              <p className="col-auto bold title">
                {t(
                  TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.DETAIL
                    .HEADER.tnsDeviceName
                )}
                :
              </p>
              <p className="col-auto bold">
                {data?.tnsDeviceName ?? detail.data?.tnsDeviceName}
              </p>
            </div>
            <div className="row">
              {data?.customerDeviceName || detail.data?.customerDeviceName ? (
                <>
                  <p className="col-auto bold title">
                    {t(
                      TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.DETAIL
                        .HEADER.customerDeviceName
                    )}
                    :
                  </p>
                  <p className="col-auto bold">
                    {data?.customerDeviceName ??
                      detail.data?.customerDeviceName}
                  </p>
                </>
              ) : null}
            </div>
          </div>
          <div className="col col-lg-auto">
            <div className="divider" />
          </div>
          <div className="col-auto px-3 device-name-container company-name m-auto">
            <p className="title">
              {t(
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.DETAIL
                  .HEADER.company
              )}
              :{' '}
            </p>
            <span className="col-auto bold">
              {data?.knownAs ?? detail.data?.knownAs}
            </span>
          </div>
          <div className="col col-lg-auto">
            <div className="divider" />
          </div>
          {cellularUsage.isWireless && (
            <div className="col-auto device-name-container m-auto">
              <MostRecentSignal />
            </div>
          )}
        </div>
      </TNSOCard>
    ) : null;
  }
);
