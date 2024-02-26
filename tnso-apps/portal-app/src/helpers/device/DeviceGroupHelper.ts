import { DragEventHandler, Key } from 'react';
import { DataNode } from 'antd/lib/tree';
import { Group } from '../../interfaces/devices/group/group';

export interface FilterType {
  nameGroup: string;
  nameSubGroup: string;
  nameSubSubGroup: string;
}

export interface OnDropEvent extends DragEventHandler<HTMLDivElement> {
  target: {
    accessKey: string;
    textContent: string;
  };
  dataTransfer: DataTransfer;
  preventDefault: () => void;
}

export class DeviceGroupHelper {
  static group: Group | undefined = undefined;
  static groups: Group[] | undefined = undefined;
  static device: Geolocation | undefined = undefined;

  static setGroups(groups: Group[]): void {
    this.groups = groups;
  }

  static checkedAllDevices(treeData: DataNode[] | undefined): Key[] {
    let checkedKeys: Key[] = [];
    const indexData: Record<string, number> = {};

    if (!treeData) {
      return checkedKeys;
    }
    // eslint-disable-next-line
    treeData.forEach((node: any) => {
      if (node.children) {
        indexData[node.key] = (indexData[node.key] || 0) + 1;
        if (indexData[node.key] > 1) {
          checkedKeys = checkedKeys.filter((checked) => checked !== node.key);
        } else {
          checkedKeys.push(node.key);
        }
      }
    });
    return checkedKeys;
  }
}
