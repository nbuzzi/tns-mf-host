import React from "react";
import { store } from "../StoreMobx";
import { BuilderParams } from "../../helpers/api/RequestHelper";
import { QueryParams } from "../../interfaces/shared/queryParams";
import { Device, DeviceParams, OperationalStatus } from "../../interfaces/devices/devices";
import _ from "lodash";
import { ReactNode } from "react";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { OptionsGeolocationTable } from "../../interfaces/devices/geolocation/geolocation";
import { SorterResult } from "antd/lib/table/interface";
import { TNSOSelectFilter } from "../../components/shared/table/SelectFilter";
import { TNSOSearchGrid } from "../../components/shared/table/SearchFilter";

// eslint-disable-next-line
export const getColumnSearchProps = (dataIndex: string, filterType?: "search" | "select", icon?: ReactNode, options?: any[]): any => ({
  // eslint-disable-next-line
  filterDropdown: (props: any) =>
    filterType === "search" ? (
      // eslint-disable-next-line
      <TNSOSearchGrid
        themeSelected="dark"
        {...props}
        onSearch={handleSearch}
        keyFilter={dataIndex}
        onReset={(): Promise<void> => handleSearch("all", dataIndex)}
        defaultValue={store.devices.activeFilters[dataIndex]}
      />
    ) : (
      // eslint-disable-next-line
      <TNSOSelectFilter options={options ?? []} onSearch={handleSearch} keyFilter={dataIndex} defaultValue={[store.devices.activeFilters[dataIndex]]} />
    ),
  filterIcon: () => icon ?? <SearchOutlined />,
  // eslint-disable-next-line
  onFilter: (value: any) => handleSearch(value, dataIndex)
});

const devices = [
  {
    dataIndex: "hasGeolocation",
    title: "hasGeolocation",
    key: "hasGeolocation",
    ellipsis: true,
    // eslint-disable-next-line
    ...getColumnSearchProps("hasGeolocation", "select", <FilterFilled />, [
      {
        label: OptionsGeolocationTable.yes,
        value: OptionsGeolocationTable.yes
      },
      {
        label: OptionsGeolocationTable.no,
        value: OptionsGeolocationTable.no
      }
    ])
  },
  {
    dataIndex: "acna",
    title: "acna",
    key: "acna",
    sorter: true,
    ellipsis: true,
    ...getColumnSearchProps("acnas", "search")
  },
  {
    dataIndex: "knownAs",
    title: "knownAs",
    key: "knownAs",
    ellipsis: true,
    sorter: true,
    ...getColumnSearchProps("knownAs", "search")
  },
  {
    dataIndex: "connectivityStatus",
    title: "serviceStatus",
    key: "connectivityStatus",
    ellipsis: true
  },
  {
    dataIndex: "country",
    title: "country",
    key: "country",
    ellipsis: true,
    sorter: true,
    ...getColumnSearchProps("country", "search")
  },
  {
    dataIndex: "customerDeviceName",
    title: "customerDeviceName",
    key: "customerDeviceName",
    ellipsis: true,
    sorter: true,
    ...getColumnSearchProps("customerDeviceName", "search")
  },
  {
    dataIndex: "operationalStatus",
    title: "operationalStatus",
    key: "operationalStatus",
    ellipsis: true,
    ...getColumnSearchProps("operationalStatus", "select", <FilterFilled />, [
      {
        label: OperationalStatus.Operational,
        value: OperationalStatus.Operational
      },
      {
        label: OperationalStatus.Configured,
        value: OperationalStatus.Configured
      },
      {
        label: OperationalStatus.Shipped,
        value: OperationalStatus.Shipped
      },
      {
        label: OperationalStatus.Testing,
        value: OperationalStatus.Testing
      },
      {
        label: OperationalStatus.Installed,
        value: OperationalStatus.Installed
      }
    ])
  },
  {
    dataIndex: "tnsDeviceName",
    title: "tnsDeviceName",
    key: "tnsDeviceName",
    ellipsis: true,
    // eslint-disable-next-line
    sorter: (a: any, b: any) => a.tnsDeviceName - b.tnsDeviceName,
    ...getColumnSearchProps("tnsDeviceName", "search")
  }
];

export const handleSort = async (
  //  eslint-disable-next-line
  pagination: any,
  //  eslint-disable-next-line
  filters: Record<string, React.ReactText[] | null>,
  //  eslint-disable-next-line
  sorter: SorterResult<Device>
): Promise<void> => {
  const queryParams = builderDeviceQueryParams({ sortBy: sorter.columnKey, orderBy: sorter.order });
  await store.devices.loadData(queryParams);
};

export const columns = {
  devices,
  handleSort
};

export function builderDeviceQueryParams({
  tableFilters,
  currentPage = 0,
  acnasKeys,
  recordsPerPage = 10,
  selectedStatuses,
  isSameGroups = false,
  sortBy,
  orderBy
}: BuilderParams = {}): DeviceParams {
  let queryParams: DeviceParams = {};
  const prevParams = store.device.filter.activeFilters;
  if (selectedStatuses) {
    if (selectedStatuses.length > 0) {
      const connectivityStatus = selectedStatuses.toString();
      queryParams = { ...queryParams, connectivityStatus };
    } else {
      queryParams = { ...queryParams, connectivityStatus: "undefined" };
    }
  }

  if (acnasKeys) {
    const acnas = acnasKeys.toString();
    queryParams = { ...queryParams, acnas };
  }

  if (orderBy && sortBy) {
    orderBy = orderBy === "ascend" ? "ASC" : "DESC";

    queryParams = { ...queryParams, sortBy, orderBy };
  }

  const startAtRecord = (currentPage || 0) * 10;
  queryParams = { ...queryParams, startAtRecord, recordsPerPage };

  if (tableFilters) {
    queryParams = { ...queryParams, ...tableFilters };
  }

  if (prevParams) {
    const newParams = { ...prevParams, ...queryParams };
    Object.keys(newParams).forEach((key) => {
      if (newParams[key as keyof QueryParams] === "") {
        delete newParams[key as keyof QueryParams];
      }
    });
    store.device.filter.setActiveFiltersData(queryParams);
    // if all the states are present the filter will be removed
    if (newParams.connectivityStatus?.split(",").length === 5) {
      delete newParams.connectivityStatus;
    }
    if (isSameGroups) {
      delete newParams.acnas;
    }
    // is discont filter of startAtRecord and recordsPerPage
    store.device.filter.isFilteredTable = Object.keys(newParams).length > 2;
    return newParams as DeviceParams;
  }

  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key as keyof QueryParams] === "") {
      delete queryParams[key as keyof QueryParams];
    }
  });
  store.device.filter.isFilteredTable = Object.keys(queryParams).length > 2;
  store.device.filter.setActiveFiltersData(queryParams);
  return queryParams;
}

export const handleSearch = async (filter: string, keyFilter: string): Promise<void> => {
  if (filter === "all") {
    filter = "";
  }
  store.devices.setActiveFiltersData(keyFilter, filter);
  const queryParams = builderDeviceQueryParams({ tableFilters: { [keyFilter]: filter } });
  if ((!store.group.groupSelected && store.group.isAllCheckedDevices) || (_.isArray(store.group.groupSelected) && !_.isEmpty(store.group.groupSelected))) {
    if (_.isArray(store.devices.selectedStatuses) && !_.isEmpty(store.devices.selectedStatuses)) {
      await store.devices.loadData(queryParams);
      await store.devices.loadDevicesStatus(queryParams);
      store.devices.setCurrentPage(1);
    }
  }
};
