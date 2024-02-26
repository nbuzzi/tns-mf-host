import React, { MouseEvent, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Divider, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ISidebarData, SidebarData } from './sidebar-data';
import { SidebarHelper } from './sidebar-helper';
import logo from '../../../assets/images/tns/tns-logo-white.png';


export enum MenuKeys {
  Monitoring = 'monitoring',
  Devices = 'devices',
  Members = 'members',
  Administration = 'administration',
  CompanyAdministration = 'companyAdministration',
  UserAdministration = 'userAdministration',
  Support = 'support',
  ChangeManagement = 'changeManagement',
  Help = 'help',
  ContactUs = 'contactUs',
  UserGuide = 'userGuide',
}

function Sidebar(): JSX.Element {
  /*   const { member, shared } = store;
  const isMiniSidebar = store.customizer.isMiniSidebar;
  ); */
  const [availableMenus, setAvailableMenus] = React.useState<ISidebarData[]>(
    []
  );
  const isActAs = localStorage.getItem('actAs');

  const handleToggleSideBar = useCallback(
    (event: MouseEvent<HTMLElement | undefined>): void => {
      /* store.customizer.ToggleMiniSidebar(); */
      event?.preventDefault();
    },
    []
  );

  useEffect(() => {
    setAvailableMenus(SidebarData);
  }, []);

  const menuItems = useMemo(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return SidebarHelper.buildingItemMenu(availableMenus, token);
    }
    return [];
  }, [availableMenus]);

  return (
    <div className={`pt-${isActAs ? '3' : '0'} position-relative`}>
      <div className="expandible-icon" onClick={handleToggleSideBar}>
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </div>
      <div className="d-flex justify-content-center align-items-center w-100 pt-3">
        <img src={logo} alt="logo" className="logo" width={40} />
      </div>
      <Divider className="divider-sidebar" />
      <Menu
        defaultSelectedKeys={['monitoring' ?? MenuKeys.Monitoring]}
        // eslint-disable-next-line
        /* onOpenChange={(menuItem) => shared.setOpenKeys(menuItem as MenuKeys[])} */
        // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/explicit-function-return-type
        /*         onSelect={(menuItem) =>
          shared.setMenuItemSelected(menuItem.key as MenuKeys)
        } */
        defaultOpenKeys={[MenuKeys.Monitoring]}
        selectedKeys={[MenuKeys.Members]}
        mode="inline"
        theme="dark"
        inlineCollapsed={false}
        items={menuItems}
        className="bg-topbar"
      />
      <Divider className="divider-sidebar" />
    </div>
  );
}
export default observer(Sidebar);
