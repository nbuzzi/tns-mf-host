import { Meta } from '@storybook/react';
import { TNSOContainer } from '../../containers/container';
import TNSOTransferList from './transfer-list-container';

const meta = {
  component: TNSOTransferList,
  title: 'Containers/TransferList',
  tags: ['autodocs'],
} satisfies Meta<typeof TNSOTransferList>;

export default meta;

const targetKeys: string[] = [];
const data: { key: string; title: string; description: string }[] = [];

for (let i = 1; i <= 100; i++) {
  const dataAux = {
    key: i.toString(),
    title: `content${i}`,
    description: `description of content${i}`,
  };
  data.push(dataAux);
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

export const defaultTransferList = () => {
  const handleChange = () => {
    console.log('Handle change list');
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
      <TNSOTransferList
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

export const disabledTransferList = () => {
  const handleChange = () => {
    console.log('Handle change list');
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
      <TNSOTransferList
        disabled
        data={data}
        handleChange={handleChange}
        targetKeys={targetKeys}
        titles={['Fuente', 'Destino']}
        pagination
        showSearch
      />
    </TNSOContainer>
  );
};
