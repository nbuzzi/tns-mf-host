import React, { ReactNode } from 'react';
import { User } from '../../interfaces/users/user';
import { store } from '../StoreMobx';
import { TRANSLATION } from '../../utils/const/translation';
import i18n from '../../i18n';
import { TNSOButton, Variants } from '@tnso/ui-components/dist';
import { SearchOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { builderDeviceQueryParams } from '../device/tableConfig';
import { TNSOSelectFilter } from '../../components/shared/table/SelectFilter';
import { SorterResult } from 'antd/lib/table/interface';
import { QueryParams } from '../../interfaces/shared/queryParams';
import { BuilderParams } from '../../helpers/api/RequestHelper';
import { TNSOSearchGrid } from '../../components/shared/table/SearchFilter';

// eslint-disable-next-line
export const getColumnSearchProps = (
  dataIndex: string,
  filterType?: 'search' | 'select',
  icon?: ReactNode,
  // eslint-disable-next-line
  options?: any[]
  // eslint-disable-next-line
): any => ({
  // eslint-disable-next-line
  filterDropdown: (props: any) =>
    filterType === 'search' ? (
      // eslint-disable-next-line
      <TNSOSearchGrid
        themeSelected="dark"
        {...props}
        onSearch={handleSearch}
        keyFilter={dataIndex}
        onReset={() => handleSearch('all', dataIndex)}
      />
    ) : (
      <TNSOSelectFilter
        options={options ?? []}
        onSearch={handleSearch}
        keyFilter={dataIndex}
        defaultValue={[store.user.activeFilters[dataIndex]]}
      />
    ),
  filterIcon: () => icon ?? <SearchOutlined />,
});

const isDisabled = (row: User): boolean => {
  return (
    row.status !== i18n.t(TRANSLATION.SHARED.DATATABLE.Enabled) ||
    !row.onboarded
  );
};

const users = [
  {
    dataIndex: 'actAs',
    title: 'actAs',
    key: 'actAs',
    width: 130,
    render: (cell: boolean, row: User): JSX.Element => {
      console.log('cell', cell);
      console.log('row', row);
      return (
        // eslint-disable-next-line
        <TNSOButton
          variant={Variants.OutlinePrimary}
          onClick={() => handleModal(true, row.username)}
          disabled={isDisabled(row)}
        >
          <UserSwitchOutlined />
        </TNSOButton>
      );
    },
  },
  {
    dataIndex: 'username',
    title: 'username',
    key: 'username',
    ellipsis: true,
    sorter: true,
    ...getColumnSearchProps('username', 'search'),
  },
  {
    dataIndex: 'firstName',
    title: 'firstName',
    key: 'firstName',
    ellipsis: true,
    sorter: true,
    ...getColumnSearchProps('firstName', 'search'),
  },
  {
    dataIndex: 'lastName',
    title: 'lastName',
    key: 'lastName',
    ellipsis: true,
    sorter: true,
    ...getColumnSearchProps('lastName', 'search'),
  },
  {
    dataIndex: 'email',
    title: 'emailAddress',
    key: 'email',
    ellipsis: true,
    sorter: true,
    ...getColumnSearchProps('email', 'search'),
  },
  {
    dataIndex: 'status',
    title: 'status',
    key: 'status',
    ellipsis: true,
  },
  {
    dataIndex: 'role',
    title: 'userRole',
    key: 'role',
    ellipsis: true,
  },
];

const companiesByUser = [
  {
    dataIndex: 'name',
    title: 'companyProfileName',
    key: 'name',
    ellipsis: true,
  },
];

const emptyMessage = i18n.t(
  TRANSLATION.SHARED.USERPROFILE.thereAreNoAssociatedCompanies
);

export const handleSort = async (
  //  eslint-disable-next-line
  pagination: any,
  //  eslint-disable-next-line
  filters: Record<string, React.ReactText[] | null>,
  //  eslint-disable-next-line
  sorter: SorterResult<User>
): Promise<void> => {
  const queryParams = builderDeviceQueryParams({
    sortBy: sorter.columnKey,
    orderBy: sorter.order,
  });
  await store.user.loadData(queryParams);
};

export const columns = {
  users,
  companiesByUser,
  emptyMessage,
  handleSort,
};

export function builderUserQueryParams({
  tableFilters,
  currentPage = 0,
  recordsPerPage = 10,
  sortBy,
  orderBy,
}: BuilderParams = {}): QueryParams {
  let queryParams: QueryParams = {};

  if (orderBy && sortBy) {
    orderBy = orderBy === 'ascend' ? 'ASC' : 'DESC';

    queryParams = { ...queryParams, sortBy, orderBy };
  }

  const startAtRecord = (currentPage || 0) * 10;
  queryParams = { ...queryParams, startAtRecord, recordsPerPage };

  if (tableFilters) {
    queryParams = { ...queryParams, ...tableFilters };
  }

  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key as keyof QueryParams] === '') {
      delete queryParams[key as keyof QueryParams];
    }
  });
  return queryParams;
}

export const handleModal = (isShowModal: boolean, username?: string): void => {
  if (username) {
    const userSelected = store.user.data?.users.find(
      (user) => user.username === username
    );
    if (userSelected) {
      store.user.setUser(userSelected);
    }
  }
  store.user.setShowModal(isShowModal);
};

export const handleSearch = async (
  filter: string,
  keyFilter: string
): Promise<void> => {
  if (filter === 'all') {
    filter = '';
  }
  const queryParams = builderDeviceQueryParams({
    tableFilters: { [keyFilter]: filter },
  });
  await store.user.loadData(queryParams);
};
