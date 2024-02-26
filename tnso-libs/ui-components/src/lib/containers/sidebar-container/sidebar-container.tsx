import { ConfigProvider, Divider, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import { useTheme } from '../../hooks/useTheme';
import { dark, light } from './sidebar-theme';
import { TNSOSidebarProps } from './sidebar-container.model';

import './sidebar-container.scss';

export function TNSOSidebar(props: TNSOSidebarProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);

  const handleToggleSideBar = () => {
    console.log('toggle');
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="pt-0'} position-relative">
        <div className="expandible-icon" onClick={handleToggleSideBar}>
          <FontAwesomeIcon
            icon={props.isMiniSidebar ? faChevronRight : faChevronLeft}
            size="sm"
          />
        </div>
        <div className="d-flex justify-content-center align-items-center w-100 pt-3">
          <img src={props.logo} alt="logo" className="logo" width={40} />
        </div>
        <Divider className="divider-sidebar" />
        <Menu
          defaultSelectedKeys={[props.menuItemSelected]}
          // eslint-disable-next-line
          onOpenChange={(menuItem) => props.setOpenKeys(props.menuKeys)}
          // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/explicit-function-return-type
          onSelect={(menuItem) => props.setMenuItemSelected(menuItem.key)}
          defaultOpenKeys={props.openKeys}
          mode={props.mode}
          inlineCollapsed={props.isMiniSidebar}
          items={props.availableMenuKeys}
          className="bg-topbar"
        />
        <Divider className="divider-sidebar" />
      </div>
    </ConfigProvider>
  );
}

export default TNSOSidebar;
