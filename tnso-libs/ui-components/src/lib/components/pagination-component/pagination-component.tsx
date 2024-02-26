import { useCallback, useMemo } from "react";
import { TNSOPaginationProps } from "./pagination-component.model";
import { ConfigProvider, Pagination } from "antd";
import { dark, light } from "./pagination-theme";
import { useTheme } from "../../hooks/useTheme";

export function TNSOPagination(props: TNSOPaginationProps): JSX.Element {
  const { handleGoToPage, handleAsyncGoToPage } = props;
  const theme = useTheme(dark, light, props.theme);

  const onChange = useCallback(
    async (page: number): Promise<void> => {
      handleGoToPage(page);
      if (handleAsyncGoToPage) {
        handleAsyncGoToPage(page);
      }
    },
    [handleGoToPage, handleAsyncGoToPage]
  );

  return (
    <ConfigProvider theme={theme}>
      <div className="tnso-pagination">
        <Pagination
          showSizeChanger={false}
          current={props.currentPage}
          total={props.totalItems}
          pageSize={props.pageSize}
          onChange={onChange}
          showTotal={(total, range) => `Records ${range[0]}-${range[1]} of ${total}`}
        />
      </div>
    </ConfigProvider>
  );
}

export default TNSOPagination;
