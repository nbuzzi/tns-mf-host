import React from 'react';
// import { useTranslation } from 'react-i18next';
import { DevicesStatus } from './DevicesStatus';
import { ConnectivityStatus } from '../../interfaces/devices/devices';
import { CheckAllStatus } from './CheckAllStatus';

import onPrimaryLogo from '../../assets/images/devices/status-online.svg';
import offlineLogo from '../../assets/images/devices/status-offline.svg';
import backupLogo from '../../assets/images/devices/status-backup.svg';
import indeterminate from '../../assets/images/devices/status-any.svg';
import unknownLogo from '../../assets/images/devices/status-unknown.svg';
import Text from 'i18n-module/i18nModule';
import { store } from '../../store/StoreMobx';
import { observer } from 'mobx-react';
import { TRANSLATION } from '../../utils/const/translation';

export const DevicesHeader: React.FC = observer(() => {
  const { devices } = store;

  return (
    <div
      className="d-flex flex-column header-container justify-content-between align-items-center w-100"
      data-testid="device-header-component"
    >
      <div className="d-flex flex-column w-100">
        <h3 className="title-Dashboard pb-4">
          <Text text={TRANSLATION.SIDEBAR.MONITORING.dashboard} />
        </h3>
      </div>
      <div className="align-self-start">
        {devices.devicesStatus && (
          <CheckAllStatus
            status={devices.devicesStatus}
            selectedStatuses={devices.selectedStatuses}
            toggleSelectedStatuses={devices.toggleSelectedStatuses}
          />
        )}
      </div>
      <div className="d-flex w-100 overflow-auto ">
        <div className="status-container">
          {devices.devicesStatus && (
            <div className="d-flex gap-2 mb-4">
              <DevicesStatus
                urlImage={onPrimaryLogo}
                status={ConnectivityStatus.onPrimary}
                statusAmount={devices.devicesStatus?.onPrimary}
              />
              <DevicesStatus
                urlImage={backupLogo}
                status={ConnectivityStatus.onBackup}
                statusAmount={devices.devicesStatus?.onBackup}
              />
              <DevicesStatus
                urlImage={offlineLogo}
                status={ConnectivityStatus.offline}
                statusAmount={devices.devicesStatus?.offline}
              />
              <DevicesStatus
                urlImage={indeterminate}
                status={ConnectivityStatus.indeterminate}
                statusAmount={devices.devicesStatus?.indeterminate}
              />
              <DevicesStatus
                urlImage={unknownLogo}
                status={ConnectivityStatus.unknown}
                statusAmount={devices.devicesStatus?.unknown}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
