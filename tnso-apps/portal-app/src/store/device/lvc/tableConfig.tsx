import React from 'react';
import { QueryParams } from '../../../interfaces/shared/queryParams';
import { DeviceParams } from '../../../interfaces/devices/devices';
import { BuilderParams } from '../../../helpers/api/RequestHelper';
import { store } from '../../StoreMobx';
import { DateHelper } from '../../../helpers/shared/DateHelper';
import { ReactNode } from 'react';
import { TNSOSelectFilter } from '../../../components/shared/table/SelectFilter';
import { SearchOutlined } from '@ant-design/icons';
import { TNSOSearchGrid } from '../../../components/shared/table/SearchFilter';

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
        defaultValue={[store.devices.activeFilters[dataIndex]]}
      />
    ),
  filterIcon: () => icon ?? <SearchOutlined />,
});

const lvcs = [
  {
    dataIndex: 'lvcTicketNumber',
    title: 'lvcTicketNumber',
    key: 'lvcTicketNumber',
    ellipsis: true,
  },
  {
    dataIndex: 'status',
    title: 'status',
    key: 'status',
    ellipsis: true,
  },
  {
    dataIndex: 'devices',
    title: 'devices',
    key: 'devices',
    ellipsis: true,
  },
  {
    dataIndex: 'startDate',
    title: 'startDate',
    key: 'startDate',

    ellipsis: true,
    render: (cell: string | null): string => {
      const timeZone = store.auth.userInfo?.timeZone;
      return cell
        ? DateHelper.getDateFromTimestampWithTimeZone(Number(cell), timeZone)
        : '';
    },
  },
  {
    dataIndex: 'ep1Acna',
    title: 'ep1Acna',
    key: 'ep1Acna',
    ellipsis: true,
  },
  {
    dataIndex: 'ep1Host',
    title: 'ep1Host',
    key: 'ep1Host',
    ellipsis: true,
  },
  {
    dataIndex: 'ep1RealIp',
    title: 'ep1RealIp',
    key: 'ep1RealIp',
    ellipsis: true,
  },
  {
    dataIndex: 'knowsEp2As',
    title: 'knowsEp2As',
    key: 'knowsEp2As',
    ellipsis: true,
  },
  {
    dataIndex: 'ep2Acna',
    title: 'ep2Acna',
    key: 'ep2Acna',
    ellipsis: true,
  },
  {
    dataIndex: 'ep2Host',
    title: 'ep2Host',
    key: 'ep2Host',
    ellipsis: true,
  },
  {
    dataIndex: 'ep2RealIp',
    title: 'ep2RealIp',
    key: 'ep2RealIp',
    ellipsis: true,
  },
  {
    dataIndex: 'knowsEp1As',
    title: 'knowsEp1As',
    key: 'knowsEp1As',
    ellipsis: true,
  },
];

export const columns = {
  lvcs,
};

export const builderLVCQueryParams = ({
  tableFilters,
  currentPage,
  recordsPerPage = 10,
}: BuilderParams = {}): QueryParams => {
  let queryParams: DeviceParams = {};
  const prevParams = localStorage.getItem('lvcParams');

  const startAtRecord = (currentPage || 0) * 10;
  queryParams = { ...queryParams, startAtRecord, recordsPerPage };

  if (tableFilters) {
    queryParams = { ...queryParams, ...tableFilters };
  }

  if (prevParams) {
    const newParams = { ...JSON.parse(prevParams), ...queryParams };
    localStorage.setItem('lvcParams', JSON.stringify(newParams));
    return newParams;
  }

  localStorage.setItem('lvcParams', JSON.stringify(queryParams));
  return queryParams;
};

export const handleSearch = async (
  filter: string,
  keyFilter: string
): Promise<void> => {
  if (filter === 'all') {
    filter = '';
  }
  const queryParams = builderLVCQueryParams({
    tableFilters: { [keyFilter]: filter },
  });
  const params = window.location.pathname.split('/');
  const deviceName = params[params.length - 1];
  if (deviceName) {
    await store.device.lvc.loadData(deviceName, queryParams);
    store.device.lvc.setCurrentPage(1);
  }
};
