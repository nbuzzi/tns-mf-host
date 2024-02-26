import { ITheme } from '../../components/theme.model';
import { TransferProps, TreeDataNode } from 'antd';

export interface TNSOTransferTreeListProps extends ITheme, TransferProps<any> {
  data: TreeDataNode[];
  titles: string[];
  currentPage?: number;
  totalRecords?: number;
  showPagination?: boolean;
  transferStyle?: React.CSSProperties;
  pageSize?: number;
  totalTargetKeys?: number;
  handleGoToPage?: (page: number) => void;
  handleGoToRightPage? : (page: number) => void;

  handleChange: (
    newTargetKeys: string[],
    direction: 'left' | 'right',
    moveKeys: string[]
  ) => void;
}
