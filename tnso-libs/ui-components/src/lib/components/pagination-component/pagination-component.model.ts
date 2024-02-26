import { PaginationProps } from "antd";
import { ITheme } from "../theme.model";

export interface TNSOPaginationProps extends PaginationProps, ITheme {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  handleGoToPage: (page: number) => void;
  handleAsyncGoToPage?: (page: number) => void;
}
