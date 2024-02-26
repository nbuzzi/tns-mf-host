import { ISidebarData } from "../../layouts/sidebars/sidebardata/SidebarData";
export class SidebarFilterHelper {
  public static filterMenu(items: ISidebarData[], parentKey: string, childKey: string, condition?: boolean): ISidebarData[] {
    const itemsFiltered = items.map((item) => {
      if (item.key === parentKey && !condition) {
        return {
          ...item,
          children: item.children?.filter((child) => child.key !== childKey)
        };
      }
      return item;
    });
    return itemsFiltered;
  }
}
