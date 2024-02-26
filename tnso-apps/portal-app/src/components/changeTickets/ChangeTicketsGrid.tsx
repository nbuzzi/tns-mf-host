import React, { useMemo } from "react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/lib/table";
import { Spin } from "antd/lib";
import { TNSOGrid } from "@tnso/ui-components/dist";
import { observer } from "mobx-react";

import { ChangeTicket, ChangeTicketsExport, ChangeTicketsResponse } from "../../interfaces/changeTickets/changeTickets";
import { builderTicketQueryParams, columns } from "../../store/changeTickets/tableConfig";
import { store } from "../../store/StoreMobx";
import { useExportDataTable } from "../../hooks/useExportDataTable";
import { MapperHelper } from "../../helpers/shared/MapperHelper";
import { ChangeTicketService } from "../../service/changeTicket/ChangeTicketService";
import { useTranslation } from "react-i18next";
import { TranslationHelper } from "../../helpers/shared/TranslationHelper";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { TRANSLATION } from "../../utils/const/translation";
import i18n from 'i18n-module/i18n';

export const ChangeTicketsGrid: React.FC = observer(() => {
  const { changeTicket } = store;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const totalRecords = useMemo(
    () => (changeTicket?.data?.totalRecords && changeTicket.data?.totalRecords > 0 ? changeTicket.data?.totalRecords : undefined),
    [changeTicket.data?.totalRecords]
  );
  const handleExportData = useExportDataTable<ChangeTicketsExport, ChangeTicketsResponse>(
    changeTicket?.data?.totalRecords ?? 0,
    10,
    ChangeTicketService,
    builderTicketQueryParams,
    `${t(TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT.changeTickets)}`,
    MapperHelper.mapChangeTicketsToExport,
    false
  );

  const handleChangePage = useCallback(
    async (page: number): Promise<void> => {
      const params = builderTicketQueryParams({ currentPage: page - 1, recordsPerPage: 10 });
      await changeTicket.loadData(params);
    },
    [changeTicket]
  );

  const handleExport = useCallback(async (): Promise<void> => {
    setIsLoadingExport(true);
    await handleExportData();
    setIsLoadingExport(false);
  }, [handleExportData]);

  const handleSelectRow = useCallback(
    async (row: ChangeTicket): Promise<void> => {
      // Navigate to the detail page for the selected ticket
      navigate(`/support/change-management/change-detail/${row.changeTicketId}/devices`);
    },
    [changeTicket, navigate]
  );

  const dataTable = useMemo(() => {
    return (
      changeTicket.data?.changeTickets.map((ticket, index) => {
        return {
          key: ticket.changeTicketId + index,
          ...ticket
        };
      }) ?? []
    );
  }, [changeTicket.data?.changeTickets]);

  const grid = useMemo(() => {
    return (
      <TNSOGrid
        totalRecords={totalRecords}
        dataSource={TranslationHelper.dataTranslation(dataTable, ["impactType", "statusOfChange"])}
        columns={TranslationHelper.columnsTranslation(columns.tickets as unknown as ColumnsType[])}
        handleGoToPage={handleChangePage}
        handleSelectRow={handleSelectRow}
        onExport={handleExport}
        emptyMessage={i18n.t(TRANSLATION.SHARED.DATATABLE.noDataAvailable)}
        currentPage={changeTicket.currentTablePage}
        showPagination={true}
        iconExport={isLoadingExport ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : <DownloadOutlined />}
      />
    );
  }, [changeTicket, handleChangePage, handleSelectRow, handleExport, t, dataTable, isLoadingExport, totalRecords]);

  return changeTicket?.data ? grid : null;
});
