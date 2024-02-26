import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { TNSOGrid } from '@tnso/ui-components/dist';
import { observer } from 'mobx-react';

import { store } from '../../../store/StoreMobx';
import {
  builderLVCQueryParams,
  columns,
} from '../../../store/device/lvc/tableConfig';
import { TranslationHelper } from '../../../helpers/shared/TranslationHelper';
import { LVCData, LVCTable } from '../../../interfaces/devices/lvc/lvc';
import { TRANSLATION } from '../../../utils/const/translation';
import { useExportDataTable } from '../../../hooks/useExportDataTable';
import { LVCService } from '../../../service/device/deviceDetail/LVCService';
import { MapperHelper } from '../../../helpers/shared/MapperHelper';
import { LVCResponse } from '../../../interfaces/devices/response/response';
import { Spin } from 'antd';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';

export interface LVCDataTableProps {
  totalRecords?: number;
  lvcs: LVCData[];
}

export const LVCDataTable: React.FC<LVCDataTableProps> = observer(
  ({ totalRecords = 0, lvcs = [] }) => {
    const { lvc } = store.device;
    const recordsPerPage = 10;
    const { deviceName } = useParams();
    const { t } = useTranslation();
    const [isLoadingExport, setIsLoadingExport] = useState(false);

    const handleExportData = useExportDataTable<LVCTable, LVCResponse>(
      totalRecords,
      recordsPerPage,
      LVCService,
      builderLVCQueryParams,
      `${deviceName}_LVC`,
      MapperHelper.mapLVCExport,
      true,
      deviceName
    );

    const handleExport = useCallback(async (): Promise<void> => {
      setIsLoadingExport(true);
      await handleExportData();
      setIsLoadingExport(false);
    }, [handleExportData]);

    const handleChangePage = useCallback(
      async (page: number): Promise<void> => {
        const params = builderLVCQueryParams({
          currentPage: page - 1,
          recordsPerPage: recordsPerPage,
        });
        await lvc.loadData(deviceName, params);
      },
      [lvc]
    );

    const dataTable = useMemo(() => {
      return (
        lvcs.map((lvc, index) => ({
          key: lvc.lvcTicketNumber + index,
          ...lvc,
        })) ?? []
      );
    }, [lvcs]);

    const grid = useMemo(() => {
      return (
        <TNSOGrid
          totalRecords={totalRecords}
          onExport={handleExport}
          iconExport={
            isLoadingExport ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : (
              <DownloadOutlined />
            )
          }
          isLoadingExport={isLoadingExport}
          dataSource={TranslationHelper.dataTranslation(dataTable, ['status'])}
          columns={TranslationHelper.columnsTranslation(
            columns.lvcs as unknown as ColumnsType[]
          )}
          handleGoToPage={handleChangePage}
          showPagination={true}
          emptyMessage={t(TRANSLATION.SHARED.DATATABLE.noDataAvailable)}
          currentPage={lvc.currentPage}
        />
      );
    }, [
      lvc,
      lvcs,
      totalRecords,
      handleChangePage,
      t,
      handleExport,
      isLoadingExport,
      dataTable,
    ]);

    return grid;
  }
);
