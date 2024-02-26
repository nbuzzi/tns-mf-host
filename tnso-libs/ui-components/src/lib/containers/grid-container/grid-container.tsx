import { useCallback, useMemo, useState } from 'react';
import { TNSOGridProps } from './grid-container.model';
import { RefTable } from 'antd/lib/table/interface';
import { Col, ConfigProvider, Row, Spin, Table } from 'antd';
import {
  DownloadOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import TNSOCard from '../../components/card-component/card-component';
import TNSODropdown from '../../components/dropdown-component/dropdown-component';
import TNSOButton from '../../components/button-component/button-component';
import { Variants } from '../../components/button-component/button-component.model';
import TNSOPagination from '../../components/pagination-component/pagination-component';
import { dark, light } from './grid-theme';
import { useTheme } from '../../hooks/useTheme';

export function TNSOGrid(props: TNSOGridProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const currentPageData = props.dataSource;
  const tableProps: RefTable = props as unknown as typeof Table;
  const iconLoading = useMemo(
    () =>
      props.disabled ? <div /> : <Spin indicator={<LoadingOutlined spin />} />,
    []
  );

  const theme = useTheme(dark, light, props.themeSelected);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      if (props.handleGoToPage) {
        props.handleGoToPage(page);
      }
    },
    [props]
  );

  const handleGoToPage = useCallback(
    (page: number) => {
      handlePageChange(page);
    },
    [handlePageChange]
  );

  const customizeRenderEmpty = useMemo(
    () => (
      <div className="grid-empty-state" data-testid="empty-message">
        <InfoCircleOutlined size={4} />
        <b style={{ color: 'white' }}>
          {props.emptyMessage ?? 'No data available at this time'}
        </b>
      </div>
    ),
    [props.emptyMessage]
  );

  const gridContent = useMemo(() => {
    return (
      <>
        <ConfigProvider renderEmpty={() => customizeRenderEmpty} theme={theme}>
          <Table
            {...tableProps}
            loading={{
              indicator: iconLoading,
              spinning: ((props.loading as boolean) || props.disabled) ?? false,
            }}
            dataSource={currentPageData}
            // scroll={{ x: "calc(700px + 75%)" }}
            pagination={false}
            // eslint-disable-next-line
            onRow={(record) => {
              return {
                onClick: () => props.handleSelectRow?.(record), // click row
              };
            }}
          />
        </ConfigProvider>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginTop: '1rem' }}
        >
          <Col>
            {props.onExport &&
              props.dataSource &&
              props.dataSource.length > 0 &&
              (props.isMultipleExport ? (
                <TNSODropdown
                  options={props.exportOptions}
                  isLoading={props.isLoadingExport}
                  disabled={props.isLoadingExport}
                >
                  {props.iconExport ?? <DownloadOutlined />}
                </TNSODropdown>
              ) : (
                <TNSOButton
                  variant={Variants.OutlinePrimary}
                  isLoading={props.isLoadingExport}
                  onClick={props.onExport}
                  disabled={props.isLoadingExport}
                >
                  {props.iconExport ?? <DownloadOutlined />}
                </TNSOButton>
              ))}
          </Col>
          {props.showPagination && (
            <Col>
              {props.totalRecords && (
                <TNSOPagination
                  totalItems={props.totalRecords}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  handleGoToPage={handleGoToPage}
                />
              )}
            </Col>
          )}
        </Row>
      </>
    );
  }, [
    customizeRenderEmpty,
    currentPageData,
    currentPage,
    handleGoToPage,
    pageSize,
    props,
    tableProps,
    theme,
    iconLoading,
  ]);

  return props.whitoutCard ? (
    gridContent
  ) : (
    <TNSOCard className="tnso-grid">{gridContent}</TNSOCard>
  );
}

export default TNSOGrid;
