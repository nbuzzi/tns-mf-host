import { ItemType, MenuItemType } from 'antd/lib/menu/hooks/useItems';
import { ReactNode } from 'react';

export interface TNSOSidebarProps {
  data: ISidebarData[];
  isMiniSidebar?: boolean;
  theme?: 'dark' | 'light';
  mode?: 'inline' | 'horizontal';
  logo?: string;
  openKeys: string[];
  menuKeys: string[];
  menuItemSelected: string;
  availableMenuKeys: ItemType<MenuItemType>[];
  setOpenKeys: (keys: string[]) => void;
  setMenuItemSelected: (key: string) => void;
}

export interface ISidebarData {
  id: number;
  roles: string[];
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
  children?: ISidebarData[];
}
