import React, { MouseEvent, useCallback, useEffect } from "react";
import { ISidebarData, SidebarData } from "../sidebardata/SidebarData";
import { AuthHelper } from "../../../helpers/auth/AuthHelper";
import { store } from "../../../store/StoreMobx";
import { observer } from "mobx-react";
import { Divider, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { useAsyncCall } from "../../../hooks/useAsyncCallShared";
import { SidebarFilterHelper } from "../../../helpers/shared/SidebarFilterHelper";
import { Link } from "react-router-dom";
import { TRANSLATION } from "../../../utils/const/translation";
import logo from "../../../assets/images/tns/tns-logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export enum MenuKeys {
  Monitoring = "monitoring",
  Devices = "devices",
  Members = "members",
  Administration = "administration",
  CompanyAdministration = "companyAdministration",
  UserAdministration = "userAdministration",
  Support = "support",
  ChangeManagement = "changeManagement",
  Help = "help",
  ContactUs = "contactUs",
  UserGuide = "userGuide"
}

function Sidebar(): JSX.Element {
  const { t } = useTranslation();
  const { member, shared } = store;
  const isMiniSidebar = store.customizer.isMiniSidebar;
  const { role, isSuperUser } = AuthHelper.getAuthByToken(localStorage.getItem("accessToken"));
  const [availableMenus, setAvailableMenus] = React.useState<ISidebarData[]>([]);
  const isActAs = localStorage.getItem("actAs");

  const handleToggleSideBar = useCallback((event: MouseEvent<HTMLElement | undefined>): void => {
    store.customizer.ToggleMiniSidebar();
    event?.preventDefault();
  }, []);

  useAsyncCall(async (): Promise<void> => {
    if (!isSuperUser) {
      await member.loadHasMemberConnectivity();
    }
  }, []);

 const buildingItemMenu = useCallback(() => {
    const newItems: ISidebarData[] = [];
    SidebarData.forEach((item) => {
      if (item.roles.includes(role)) {
        if (item.children) {
          const children: ISidebarData[] = [];
          item.children.forEach((child) => {
            if (child.roles.includes(role)) {
              const newChild = {
                ...child,
                label: (
                  // eslint-disable-next-line
                  <Link to={child.href} className="text-decoration-none sidebar-link">
                    {t(TRANSLATION.SIDEBAR.MENU[child.label as keyof typeof TRANSLATION.SIDEBAR.MENU])}
                  </Link>
                )
              };
              children.push(newChild);
            }
          });
          if (children.length > 0) {
            const newItem = {
              ...item,
              children,
              label: t(TRANSLATION.SIDEBAR.MENU[item.label as keyof typeof TRANSLATION.SIDEBAR.MENU])
            };
            newItems.push(newItem);
          }
        } else {
          const newItem = {
            ...item,
            label: t(TRANSLATION.SIDEBAR.MENU[item.label as keyof typeof TRANSLATION.SIDEBAR.MENU])
          };
          newItems.push(newItem);
        }
      }
    });
    return newItems;
  }, [role, t]);

  useEffect(() => {
    const newItems = buildingItemMenu();
    const filteredMenus = SidebarFilterHelper.filterMenu(newItems, "monitoring", "members", member.hasMemberConnectivity?.hasMemberConnectivity);
    setAvailableMenus(filteredMenus);
  }, [member.hasMemberConnectivity, t]);

  return (
    <div className={`pt-${isActAs ? "3" : "0"} position-relative`}>
      <div className="expandible-icon" onClick={handleToggleSideBar}>
        <FontAwesomeIcon icon={isMiniSidebar ? faChevronRight : faChevronLeft} size="sm" />
      </div>
      <div className="d-flex justify-content-center align-items-center w-100 pt-3">
        <img src={logo} alt="logo" className="logo" width={40} />
      </div>
      <Divider className="divider-sidebar" />
      <Menu
        defaultSelectedKeys={[shared.menuItemSelected ?? MenuKeys.Monitoring]}
        // eslint-disable-next-line
        onOpenChange={(menuItem) => shared.setOpenKeys(menuItem as MenuKeys[])}
        // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/explicit-function-return-type
        onSelect={(menuItem) => shared.setMenuItemSelected(menuItem.key as MenuKeys)}
        defaultOpenKeys={shared.openKeys ?? [MenuKeys.Monitoring]}
        openKeys={shared.openKeys}
        selectedKeys={[shared.menuItemSelected ?? MenuKeys.Monitoring]}
        mode="inline"
        theme="dark"
        inlineCollapsed={isMiniSidebar}
        items={availableMenus}
        className="bg-topbar"
      />
      <Divider className="divider-sidebar" />
    </div>
  );
}
export default observer(Sidebar);
