import React, { useCallback, useState } from 'react';
import {
  Transfer,
  TreeDataNode,
  Tree,
  ConfigProvider,
  TransferProps,
  Row,
  Col,
} from 'antd';
import { TNSOTransferTreeListProps } from './transfer-tree-list-container.model';
import { dark, light } from './transfer-tree-list-theme';
import { useTheme } from '../../hooks/useTheme';
import './transfer-tree-list-styles.scss';
import TNSOPagination from '../../components/pagination-component/pagination-component';

export function TNSOTreeTransferList(
  props: TNSOTransferTreeListProps
): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const currentPageData = props.data;
  const theme = useTheme(dark, light, props.theme);
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

  const generateTree = (
    treeNodes: TreeDataNode[] = [],
    checkedKeys: string[] = []
  ): TreeDataNode[] =>
    treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: checkedKeys.includes(props.key as string),
      children: generateTree(children, checkedKeys),
    }));
  const isChecked = (selectedKeys: React.Key[], eventKey: React.Key) =>
    selectedKeys.includes(eventKey);

  const renderTransfer = (
    { selectedKeys = [], targetKeys = [] }: TransferProps<any>,
    direction: 'left' | 'right',
    onItemSelect: (key: string, check: boolean) => void
  ) => {
    if (direction === 'left') {
      const startIndex = (props.currentPage ?? 1 - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = props.data.slice(startIndex, endIndex);

      const checkedKeys = [...selectedKeys, ...targetKeys];

      return (
        <div style={props.transferStyle}>
          <Tree
            blockNode
            checkable
            checkStrictly
            checkedKeys={checkedKeys}
            treeData={generateTree(paginatedData, targetKeys)}
            onCheck={(_, { node: { key } }) => {
              onItemSelect(key as string, !isChecked(checkedKeys, key));
            }}
            onSelect={(_, { node: { key } }) => {
              onItemSelect(key as string, !isChecked(checkedKeys, key));
            }}
          />
        </div>
      );
    }
  };

  return (
    <>
      <ConfigProvider theme={theme}>
        <Transfer
          dataSource={currentPageData}
          onChange={handleOnChange}
          render={(item) => item.title}
          targetKeys={currentRightPageData}
          {...props}
        >
          {({ direction, onItemSelect, selectedKeys }) => {
            return renderTransfer(
              { selectedKeys, targetKeys: props.targetKeys },
              direction,
              onItemSelect
            );
          }}
        </Transfer>
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

export default TNSOTreeTransferList;
