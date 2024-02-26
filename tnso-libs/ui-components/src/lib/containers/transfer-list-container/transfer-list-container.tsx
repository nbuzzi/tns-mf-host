import React, { useCallback, useState  } from 'react';
import { Transfer, ConfigProvider, Col, Row } from 'antd';
import { TNSOTransferListProps } from './transfer-list-container.model';
import { dark, light } from './transfer-list-theme';
import { useTheme } from '../../hooks/useTheme';
import TNSOPagination from '../../components/pagination-component/pagination-component';

export function TNSOTransferList(props: TNSOTransferListProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const currentPageData = props.data;
  const [currentRightPage, setCurrentRightPage] = useState(1);
  const currentRightPageData = props.targetKeys;

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      if (props.handleGoToPage) {
        props.handleGoToPage(page);
      }
    },
    [props]
  );

  const handleRightPageChange = useCallback(
    (page: number) => {
      setCurrentRightPage(page);
      if (props.handleGoToRightPage) {
        props.handleGoToRightPage(page);
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

  const handleGoToRightPage = useCallback(
    (page: number) => {
      handleRightPageChange(page);
    },
    [handleRightPageChange]
  );

  const handleOnChange = useCallback(
    (
      newTargetKeys: string[],
      direction: 'left' | 'right',
      moveKeys: string[]
    ) => {
      props.handleChange(newTargetKeys, direction, moveKeys);
    },
    [props]
  );


  return (
    <>
      <ConfigProvider theme={theme}>
        <Transfer
          dataSource={currentPageData}
          onChange={handleOnChange}
          render={(item) => item.title}
          pagination
          targetKeys={currentRightPageData}
          {...props}
        />
      </ConfigProvider>
      <Row justify="space-between" align="middle" style={{ marginTop: '1rem' }}>
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
        {props.showPagination && (
          <Col>
            {props.totalTargetKeys && (
              <TNSOPagination
                totalItems={props.totalTargetKeys}
                pageSize={pageSize}
                currentPage={currentRightPage}
                handleGoToPage={handleGoToRightPage}
              />
            )}
          </Col>
        )}
      </Row>
    </>
  );
}

export default TNSOTransferList;
