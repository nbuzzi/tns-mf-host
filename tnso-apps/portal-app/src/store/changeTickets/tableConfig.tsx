import React, { ReactNode } from "react";
import { store } from "../StoreMobx";
import { BuilderParams } from "../../helpers/api/RequestHelper";
import { ChangeTicket, ChangeTicketsParams } from "../../interfaces/changeTickets/changeTickets";
import { SearchOutlined } from "@ant-design/icons";
import { TNSOSearchGrid } from "../../components/shared/table/SearchFilter";
import { SorterResult } from "antd/lib/table/interface";
import { builderDeviceQueryParams } from "../device/tableConfig";
import { DateHelper } from "../../helpers/shared/DateHelper";

// eslint-disable-next-line
const getColumnSearchProps = (dataIndex: string, icon?: ReactNode): any => ({
  // eslint-disable-next-line
  filterDropdown: (props: any) => <TNSOSearchGrid themeSelected="dark" {...props} onSearch={handleSearch} keyFilter={dataIndex} onReset={() => handleSearch("all", dataIndex)} />,
  filterIcon: () => icon ?? <SearchOutlined />,
  // eslint-disable-next-line
  onFilter: (value: any) => handleSearch(value, dataIndex)
});

const tickets = [
  {
    dataIndex: "changeStartTime",
    title: "changeStartTime",
    key: "changeStartTime",
    ellipsis: true,
    render: (cell: string): string => {
      const timeZone = store.auth.userInfo?.timeZone;
      return DateHelper.getDateFromTimestampWithTimeZone(Number(cell), timeZone);
    }
  },
  {
    dataIndex: "changeTicketId",
    title: "changeTicketId",
    key: "changeTicketId",
    ellipsis: true,
    ...getColumnSearchProps("changeTicketId")
  },
  {
    dataIndex: "companyName",
    title: "companyName",
    key: "companyName",
    ellipsis: true,
    ...getColumnSearchProps("companyName")
  },
  {
    dataIndex: "changeDescription",
    title: "changeDescription",
    key: "changeDescription",
    ellipsis: true
  },
  {
    dataIndex: "impactType",
    title: "impactType",
    key: "impactType",
    ellipsis: true
  },
  {
    dataIndex: "statusOfChange",
    title: "statusOfChange",
    key: "statusOfChange",
    ellipsis: true
  },
  {
    dataIndex: "maximumDuration",
    title: "maximumDurationHrs",
    key: "maximumDuration",
    ellipsis: true,
    render: (cell: number): string => {
      return Number(cell).toFixed(1);
    }
  }
];

const devicesEffected = [
  {
    dataIndex: "companyName",
    title: "companyName",
    key: "companyName",
    ellipsis: true
  },
  {
    dataIndex: "merchantName",
    title: "merchantName",
    key: "merchantName",
    ellipsis: true
  },
  {
    dataIndex: "customerSiteName",
    title: "customerSiteName",
    key: "customerSiteName",
    ellipsis: true
  },
  {
    dataIndex: "customerDeviceName",
    title: "customerDeviceName",
    key: "customerDeviceName",
    ellipsis: true
  },
  {
    dataIndex: "tnsDeviceName",
    title: "tnsDeviceName",
    key: "tnsDeviceName",
    ellipsis: true
  }
];

export const handleSort = async (
  //  eslint-disable-next-line
  pagination: any,
  //  eslint-disable-next-line
  filters: Record<string, React.ReactText[] | null>,
  //  eslint-disable-next-line
  sorter: SorterResult<ChangeTicket>
): Promise<void> => {
  const queryParams = builderDeviceQueryParams({ sortBy: sorter.columnKey, orderBy: sorter.order });
  await store.changeTicket.loadData(queryParams);
};

export const columns = {
  tickets,
  devicesEffected,
  handleSort
};

export function builderTicketQueryParams({ tableFilters, currentPage, recordsPerPage = 10 }: BuilderParams = {}): ChangeTicketsParams {
  let queryParams: ChangeTicketsParams = {};
  const prevParams = localStorage.getItem("ticketParams");

  const startAtRecord = (currentPage || 0) * 10;
  queryParams = { ...queryParams, startAtRecord, recordsPerPage };

  if (tableFilters) {
    queryParams = { ...queryParams, ...tableFilters };
  }
  if (prevParams) {
    const newParams = { ...JSON.parse(prevParams), ...queryParams };
    localStorage.setItem("ticketParams", JSON.stringify(newParams));
    Object.keys(newParams).forEach((key) => {
      if (newParams[key as keyof ChangeTicketsParams] === "") {
        delete newParams[key as keyof ChangeTicketsParams];
      }
    });
    return newParams;
  }

  localStorage.setItem("ticketParams", JSON.stringify(queryParams));
  return queryParams;
}

const handleSearch = async (filter: string, keyFilter: string): Promise<void> => {
  if (filter === "NaN" || filter === "all") {
    filter = "";
  }
  const queryParams = builderTicketQueryParams({ tableFilters: { [keyFilter]: filter } });
  await store.changeTicket.loadData(queryParams);
  store.changeTicket.setCurrentTablePage(1);
};
