import { Meta } from '@storybook/react';
import { TNSOContainer } from '../container';
import TNSOTreeTransferList from './transfer-tree-list-container';
import { TreeDataNode } from 'antd';
import './transfer-tree-list-styles.scss';

const meta = {
  component: TNSOTreeTransferList,
  title: 'Containers/TreeTransferList',
  tags: ['autodocs'],
} satisfies Meta<typeof TNSOTreeTransferList>;

export default meta;

const targetKeys: string[] = [];
const data: TreeDataNode[] = [];

for (let i = 1; i <= 100; i++) {
  const dataAux: TreeDataNode = {
    key: i.toString(),
    title: `content${i}`,
    children: [],
  };
  const numChildren = Math.floor(Math.random() * 5) + 1;
  for (let j = 1; j <= numChildren; j++) {
    const child = {
      key: `${i}.${j}`,
      title: `child${j}`,
    };
    dataAux.children?.push(child);
  }

  data.push(dataAux);
}

for (let i = 1; i <= 100; i++) {
  const child = `${i}`;
  targetKeys.push(child);
}
// Pagination props
const pageSize = 10; // Number of items per page
const totalRecords = data.length; // Total number of records
const totalTargetKeys = targetKeys.length;
let currentPage = 1; // Current page
let currentPageData = data.slice(0, pageSize);
let currentRightPage = 1; // Current page
let currentTargetKeys = targetKeys.slice(0, pageSize);

const handleGoToPage = (page: number) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);
  currentPageData = data.slice(startIndex, endIndex);
  currentPage = page;
};
export const defaultTreeTransferList = () => {
  const handleChange = (
    newTargetKeys: string[],
    direction: 'left' | 'right',
    moveKeys: string[]
  ) => {
    console.log(newTargetKeys, direction, moveKeys);
  };

  return (
    <TNSOContainer
      className="dark-theme"
      style={{
        backgroundColor: '#0F0F1A',
        height: '100vh',
        width: '100%',
      }}
    >
      <TNSOTreeTransferList
        data={currentPageData}
        handleChange={handleChange}
        targetKeys={currentTargetKeys}
        titles={['Fuente', 'Destino']}
        transferStyle={{ height: '361px', overflow: 'auto' }}
        handleGoToPage={handleGoToPage}
        totalRecords={totalRecords}
        totalTargetKeys={totalTargetKeys}
        showPagination
        showSearch
      />
    </TNSOContainer>
  );
};

export const TreeTransferListWithoutTargetKeys = () => {
  const handleChange = (
    newTargetKeys: string[],
    direction: 'left' | 'right',
    moveKeys: string[]
  ) => {
    console.log(newTargetKeys, direction, moveKeys);
  };

  return (
    <TNSOContainer
      className="dark-theme"
      style={{
        backgroundColor: '#0F0F1A',
        height: '100vh',
        width: '100%',
      }}
    >
      <TNSOTreeTransferList
        data={currentPageData}
        handleChange={handleChange}
        targetKeys={[]}
        titles={['Fuente', 'Destino']}
        transferStyle={{ height: '361px', overflow: 'auto' }}
        handleGoToPage={handleGoToPage}
        totalRecords={totalRecords}
        totalTargetKeys={0}
        showPagination
        showSearch
      />
    </TNSOContainer>
  );
};
