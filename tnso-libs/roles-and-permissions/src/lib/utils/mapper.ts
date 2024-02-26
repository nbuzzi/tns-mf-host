import { IMenu } from '../models/menu.model';

export class Mapper {
  private static snakeCaseToCamelCase(str: string): string {
    return str.replace(/([-_]\w)/g, (match): string =>
      match.charAt(1).toUpperCase()
    );
  }

  public static featureListToMenuItems(menus: IMenu[]): string[] {
    const menuItems: string[] = [];
    menus.forEach((menu): void => {
      menuItems.push(menu.featureGroup);
      menu.featureList.map((feature) =>
        menuItems.push(this.snakeCaseToCamelCase(feature))
      );
    });
    return menuItems;
  }
}
