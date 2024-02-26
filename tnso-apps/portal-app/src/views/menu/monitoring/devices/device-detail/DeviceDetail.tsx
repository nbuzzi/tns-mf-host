import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { TRANSLATION } from '../../../../../utils/const/translation';
import { Button, Tab, Tabs as TabContainer } from 'react-bootstrap';
import { HeaderDetail } from '../../../../../components/device/HeaderDetail';
import { Details } from './tabs/Details';
import { Uptime } from './tabs/Uptime';
import { Notes } from './tabs/Notes';
import { LogicalVirtualCircuits } from './tabs/LogicalVirtualCircuits';
import { useScreenSize } from '../../../../../hooks/useScreenSize';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TABS_ENABLED } from '../../../../../config/authorization/tabsPermission';
import { useAsyncCall } from '../../../../../hooks/useAsyncCall';

import { store } from '../../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { Members } from './tabs/Members';
import { CellularSignal } from './tabs/CellularSignal';
import { CellularUsage } from './tabs/CellularUsage';
import i18n from 'i18n-module/i18n';

export enum Tabs {
  Details = 'details',
  CellularUsage = 'cellularUsage',
  CellularSignal = 'cellularSignal',
  Uptime = 'uptime',
  Notes = 'notes',
  LVC = 'lvc',
  Members = 'members',
}

export const DeviceDetail: React.FC = observer(() => {
  const { device } = store;
  const { member } = store;
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();
  const [viewActive, setViewActive] = useState<Tabs>();
  const availableTabs: Tabs[] = useMemo(
    () =>
      // eslint-disable-next-line array-callback-return
      Object.values(Tabs).filter((tab): Tabs | undefined => {
        if (
          (TABS_ENABLED[tab] && tab === Tabs.CellularUsage) ||
          (TABS_ENABLED[tab] && tab === Tabs.CellularSignal)
        ) {
          if (store.device.cellularUsage.isWireless) {
            return tab;
          }
        } else if (tab === Tabs.LVC && TABS_ENABLED[tab]) {
          if (
            store.device.lvc.data?.lvcs &&
            store.device.lvc.data?.lvcs?.length > 0
          ) {
            return tab;
          }
        } else {
          if (tab === Tabs.Members && TABS_ENABLED[tab]) {
            if (member.hasMemberDevice?.hasMemberConnectivity) {
              return tab;
            }
          } else {
            if (TABS_ENABLED[tab]) {
              return tab;
            }
          }
        }
      }),
    [
      device.lvc.data?.lvcs,
      device.cellularUsage.isWireless,
      member.hasMemberDevice?.hasMemberConnectivity,
    ]
  );

  const { deviceName } = useParams();

  const loadMethod = useCallback(async (): Promise<void> => {
    if (deviceName) {
      await device.uptime.loadDataDaily(deviceName);
      await device.lvc.loadData(deviceName, {
        startAtRecord: 0,
        recordsPerPage: 10,
      });
      await device.cellularUsage.loadWireless(deviceName);
      await member.loadHasMemberDevice(deviceName);
    }
  }, []);

  useAsyncCall(async () => await loadMethod(), []);

  const handleViewChange = useCallback(
    (tab: string | null): void => {
      setViewActive(tab as Tabs);
    },
    [setViewActive]
  );

  useEffect(() => {
    if (!viewActive) {
      const activeTabs = Object.values(Tabs).filter((tab) => TABS_ENABLED[tab]);
      setViewActive(activeTabs[0]);
    }
  }, [viewActive]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const currentTab = useMemo(() => {
    return (
      <>
        {viewActive === Tabs.Details && <Details />}
        {viewActive === Tabs.CellularSignal && <CellularSignal />}
        {viewActive === Tabs.CellularUsage && <CellularUsage />}
        {viewActive === Tabs.Uptime && <Uptime />}
        {viewActive === Tabs.LVC && <LogicalVirtualCircuits />}
        {viewActive === Tabs.Notes && <Notes />}
        {viewActive === Tabs.Members && <Members />}
      </>
    );
  }, [isMobile, viewActive]);

  return (
    <div className="d-flex flex-column gap-2 device-detail-container">
      <div className="d-flex gap-2 device-detail">
        <TabContainer
          defaultActiveKey={viewActive}
          id="uncontrolled-tab-example"
          className="mb-1 tab-container"
          onSelect={handleViewChange}
          unmountOnExit={true}
          transition={false}
          activeKey={viewActive}
        >
          {availableTabs.map((tab, index) => (
            <Tab
              eventKey={tab}
              title={i18n.t(
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.TABS[
                  tab as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.TABS
                ]
              )}
              key={index}
            >
              <Button
                variant="outline-primary"
                className="d-none d-md-flex"
                onClick={goBack}
                size="sm"
              >
                <FontAwesomeIcon icon={faArrowLeft} size="xs" />
              </Button>
            </Tab>
          ))}
        </TabContainer>
      </div>
      {<HeaderDetail tnsDeviceName={deviceName} />}
      {currentTab}
    </div>
  );
});

export default DeviceDetail;
