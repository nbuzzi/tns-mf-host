import { Link } from 'react-router-dom';
import { Authorization } from '@tnso/roles-and-permissions';
import { TRANSLATION } from '../../../utils/translation';
import { ISidebarData } from './sidebar-data';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

export class SidebarHelper {
  public static buildingItemMenu(data: ISidebarData[], token: string) {
    const newItems: ISidebarData[] = [];
    const menuItem: string[] = Authorization.getRoutesByJwt(token);
    data.forEach((item) => {
      if (this.isMenuAvailable(item.key, menuItem)) {
        if (item.children) {
          const children: ISidebarData[] = [];
          item.children.forEach((child) => {
            if (this.isMenuAvailable(child.key, menuItem)) {
              const newChild = {
                ...child,
                label: (
                  <Link
                    to={child.href}
                    className="text-decoration-none sidebar-link"
                  >
                    <Text
                      text={
                        TRANSLATION.SIDEBAR.MENU[
                          child.label as keyof typeof TRANSLATION.SIDEBAR.MENU
                        ]
                      }
                    />
                  </Link>
                ),
              };
              children.push(newChild);
            }
          });
          if (children.length > 0) {
            const newItem = {
              ...item,
              children,
              label: i18n.t(
                TRANSLATION.SIDEBAR.MENU[
                  item.label as keyof typeof TRANSLATION.SIDEBAR.MENU
                ]
              ),
            };
            newItems.push(newItem);
          }
        } else {
          const newItem = {
            ...item,
            label: i18n.t(
              TRANSLATION.SIDEBAR.MENU[
                item.label as keyof typeof TRANSLATION.SIDEBAR.MENU
              ]
            ),
          };
          newItems.push(newItem);
        }
      }
    });
    return newItems;
  }

  private static isMenuAvailable(key: string, menus: string[]): boolean {
    return menus.some((item) => item === key);
  }
}
