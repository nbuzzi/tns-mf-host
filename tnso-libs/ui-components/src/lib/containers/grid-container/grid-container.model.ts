import { ReactNode } from 'react';
import {
  CustomizeComponent,
  CustomizeScrollBody,
} from 'rc-table/lib/interface';
import { ColumnsType } from 'antd/es/table';
import { SpinProps, TooltipProps } from 'antd';
import { ITheme } from 'lib/components/theme.model';

const enum Fixed {
  left = 'left',
  right = 'right',
}

export interface TableComponents<RecordType> {
  table?: CustomizeComponent;
  header?: {
    wrapper?: CustomizeComponent;
    row?: CustomizeComponent;
    cell?: CustomizeComponent;
  };
  body?:
    | CustomizeScrollBody<RecordType>
    | {
        wrapper?: CustomizeComponent;
        row?: CustomizeComponent;
        cell?: CustomizeComponent;
      };
}

interface Expandable {
  childrenColumnName?: string;
  columnTitle?: ReactNode;
  columnWidth?: string | number;
  defaultExpandAllRows?: boolean;
  defaultExpandedRowKeys?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expandedRowClassName?: (record: any, index: number, indent: number) => string;
  expandedRowKeys?: string[];
  expandedRowRender?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    record: any,
    index: number,
    indent: number,
    expanded: boolean
  ) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expandIcon?: (props: any) => ReactNode;
  expandRowByClick?: boolean;
  fixed?: boolean | string | Fixed;
  indentSize?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowExpandable?: (record: any) => boolean;
  showExpandColumn?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onExpand?: (record: any, event: any) => void;
  onExpandedRowsChange?: (expandedRows: string[]) => void;
}

export interface TableProps {
  bordered?: boolean;
  columns?: ColumnsType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: TableComponents<any>;
  dataSource?: object[];
  expandable?: Expandable;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footer?: (currentPageData: any) => ReactNode;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  loading?: boolean | SpinProps;
  locale?: object;
  pagination?: object | false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClassName?: (record: any, index: number) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowKey?: string | ((record: any) => string);
  rowSelection?: object;
  scroll?:
    | boolean
    | {
        offsetHeader?: number;
        offsetScroll?: number;
        getContainer?: () => HTMLElement;
      };
  showHeader?: boolean;
  showSorterTooltip?: boolean | TooltipProps;
  size?: 'large' | 'middle' | 'small';
  sortDirections?: Array<'ascend' | 'descend'>;
  sticky?:
    | boolean
    | {
        offsetHeader?: number;
        offsetScroll?: number;
        getContainer?: () => HTMLElement;
      };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  summary?: (currentData: any) => ReactNode;
  tableLayout?: '-' | 'auto' | 'fixed';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title?: (currentPageData: any) => ReactNode;
  onChange?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pagination: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorter: any,
    extra: { currentDataSource: []; action: 'paginate' | 'sort' | 'filter' }
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onHeaderRow?: (columns: any, index: number) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRow?: (record: any, index: number) => any;
  virtual?: boolean;
}

export interface TNSOGridProps extends TableProps, ITheme {
  currentPage?: number;
  totalRecords?: number;
  themeSelected?: 'light' | 'dark';
  handleGoToPage?: (page: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelectRow?: (row: any) => void;
  onExport?: () => Promise<void>;
  showPagination?: boolean;
  isLoadingExport?: boolean;
  isMultipleExport?: boolean;
  exportOptions?: { label: string; onClick: () => void }[];
  iconExport?: ReactNode;
  emptyMessage?: string;
  disabled?: boolean;
  whitoutCard?: boolean;
}
