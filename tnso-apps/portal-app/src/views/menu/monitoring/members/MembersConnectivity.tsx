import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Tab, Tabs as TabContainer } from 'react-bootstrap';
import { useScreenSize } from '../../../../hooks/useScreenSize';
import { TABS_ENABLED } from '../../../../config/authorization/tabsPermission';
import { observer } from 'mobx-react';
import MembersConnectivity from './tabs/MembersConnections';
import { ExportAllMembers } from './tabs/ExportAllMembers';
import membersConnectivity from '../../../../store/memberConnectivity/MemberConnectivity';
import { store } from '../../../../store/StoreMobx';
// import { TRANSLATION } from '../../../../utils/const/translation';
// import i18n from 'i18n-module/i18n';

export enum Tabs {
  MembersConnectivity = 'membersConnectivity',
  ExportAllMembers = 'exportAllMembers',
}

const MembersConnections: React.FC = observer(() => {
  const { member } = store;
  const { isMobile } = useScreenSize();
  const [viewActive, setViewActive] = useState<Tabs>();
  const thereIsData = useMemo(
    () =>
      Boolean(
        member?.data &&
          ((member.data.members &&
            member.data.members.length > 0 &&
            member?.membersGraph) ||
            member.membersGraph.srcAcna !== '')
      ) || false,
    [
      member.data,
      member?.data?.members,
      membersConnectivity.selectedItem,
      member?.membersGraph,
      member.membersGraph.srcAcna,
    ]
  );
  const availableTabs: Tabs[] = useMemo(
    () =>
      Object.values(Tabs).filter((tab): Tabs | undefined => {
        if (tab === Tabs.ExportAllMembers && TABS_ENABLED[tab]) {
          if (thereIsData) {
            return tab;
          }
        } else if (TABS_ENABLED[tab]) {
          return tab;
        }
      }),
    [thereIsData]
  );

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

  const currentTab = useMemo(() => {
    return (
      <>
        {viewActive === Tabs.MembersConnectivity && <MembersConnectivity />}
        {viewActive === Tabs.ExportAllMembers && <ExportAllMembers />}
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
              // title={i18n.t(
              //   TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.TABS[
              //     tab as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.TABS
              //   ]
              // )}
              title="hola"
              key={index}
            />
          ))}
        </TabContainer>
      </div>
      {currentTab}
    </div>
  );
});
export default MembersConnections;
