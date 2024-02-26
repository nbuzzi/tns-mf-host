import { TransferDirection } from 'antd/lib/transfer';
import { ITheme } from '../../components/theme.model';
import TNSOPagination from '../../components/pagination-component/pagination-component';
import { TransferProps } from 'antd';

export interface DataTransfer {
  key: string;
  title: string;
  description: string;
}

export interface TNSOTransferListProps extends ITheme, TransferProps<any> {
  data: DataTransfer[];
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
