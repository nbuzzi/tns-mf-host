import { Meta } from '@storybook/react';
import { TNSOContainer } from '../../containers/container';
import TNSOGrid from './grid-container';
import { ReactNode } from 'react';
import { FilterFilled } from '@ant-design/icons';
import TNSOSearchGrid from '../../components/search-grid-component/search-grid-component';
import './grid-container.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getColumnSearchProps = (dataIndex: string): any => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilter: (value: any, record: any) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
  onFilterDropdownOpenChange: () => {},
});

const mockedData = {
  totalRecords: 10,
  currentPage: 1,
  data: [
    {
      key: '1',
      name: 'John',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '3',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '4',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '5',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '6',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '7',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '8',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '9',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '10',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ],
  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sorter: (a: any, b: any) => a.name - b.name,
      filterDropdown: (): JSX.Element => (
        <TNSOSearchGrid
          keyFilter=""
          onSearch={() => {}}
          themeSelected="dark"
          onReset={() => {}}
        />
      ),
      filterIcon: (): ReactNode => <FilterFilled />,
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onFilter: (value: string, record: any) =>
        record.name.indexOf(value) === 0,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
  ],
};

const meta = {
  component: TNSOGrid,
  title: 'Containers/Grid',
  tags: ['autodocs'],
} satisfies Meta<typeof TNSOGrid>;

export default meta;

export const DefaultWithoutPagination = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
      width: '90%',
    }}
  >
    <TNSOGrid
      dataSource={mockedData.data}
      columns={mockedData.columns}
      themeSelected="dark"
    />
  </TNSOContainer>
);

export const Disabled = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
      width: '90%',
    }}
  >
    <TNSOGrid
      dataSource={mockedData.data}
      columns={mockedData.columns}
      themeSelected="dark"
      disabled
    />
  </TNSOContainer>
);

export const DefaultWithPagination = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
      width: '90%',
    }}
  >
    <TNSOGrid
      dataSource={mockedData.data}
      columns={mockedData.columns}
      showPagination
      totalRecords={mockedData.totalRecords}
      themeSelected="dark"
    />
  </TNSOContainer>
);

export const DefaultWithExportWithoutPagination = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
      width: '90%',
    }}
  >
    <TNSOGrid
      dataSource={mockedData.data}
      columns={mockedData.columns}
      onExport={async () => {}}
      themeSelected="dark"
    />
  </TNSOContainer>
);

export const DefaultWithExportWithPagination = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
      width: '90%',
    }}
  >
    <TNSOGrid
      dataSource={mockedData.data}
      columns={mockedData.columns}
      onExport={async () => {}}
      totalRecords={mockedData.totalRecords}
      showPagination
      themeSelected="dark"
    />
  </TNSOContainer>
);

export const DefaultWithMultipleExportWithoutPagination = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
      width: '90%',
    }}
  >
    <TNSOGrid
      dataSource={mockedData.data}
      columns={mockedData.columns}
      isMultipleExport
      exportOptions={[
        { label: 'option 1', onClick: () => {} },
        { label: 'option 2', onClick: () => {} },
      ]}
      onExport={async () => {}}
      themeSelected="dark"
    />
  </TNSOContainer>
);

export const DefaultWithMultipleExportWithPagination = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
      width: '90%',
    }}
  >
    <TNSOGrid
      dataSource={mockedData.data}
      columns={mockedData.columns}
      isMultipleExport
      exportOptions={[
        { label: 'option 1', onClick: () => {} },
        { label: 'option 2', onClick: () => {} },
      ]}
      onExport={async () => {}}
      totalRecords={mockedData.totalRecords}
      showPagination
      themeSelected="dark"
    />
  </TNSOContainer>
);
