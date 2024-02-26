import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { TNSOButton, TNSOGrid, Variants } from '@tnso/ui-components/dist';
import { utils } from 'xlsx';

import { CellularUsage } from '../../../interfaces/devices/cellular/cellularUsage';
import {
  cellularUsageTranslatedData,
  columns,
} from '../../../store/device/cellularUsage/tableConfig';
import { TRANSLATION } from '../../../utils/const/translation';
import { TranslationHelper } from '../../../helpers/shared/TranslationHelper';
import { MapperHelper } from '../../../helpers/shared/MapperHelper';
import {
  ExportXLSLHelper,
  TypeFile,
} from '../../../helpers/shared/ExportXLSLHelper';

interface Props {
  data?: CellularUsage[];
}
export const HistoricalData: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const dataTranslated = cellularUsageTranslatedData(
    t,
    data?.slice().reverse() ?? []
  );

  const exportData = useCallback(async () => {
    if (data) {
      setIsLoadingExport(true);
      const dataMapped = MapperHelper.mapUsageToExport(data);
      const wb = utils.book_new();
      ExportXLSLHelper.addSheetToBook(wb, dataMapped, 1);
      ExportXLSLHelper.exportToXLSL(
        wb,
        `${data[0].name}_${t(TRANSLATION.EXPORT.cellularUsageHistoricalData)}`,
        TypeFile.CSV
      );
      setIsLoadingExport(false);
    }
  }, [data, t]);

  const dataTable = useMemo(
    () =>
      data?.map((historical, index) => ({
        key: historical.name + index,
        ...historical,
      })) ?? [],
    [data]
  );

  const grid = useMemo(() => {
    return (
      <div className="d-flex flex-column gap-2">
        <TNSOGrid
          dataSource={dataTranslated}
          columns={TranslationHelper.columnsTranslation(
            columns.historicalPeriod as unknown as ColumnsType[]
          )}
          emptyMessage={t(TRANSLATION.SHARED.DATATABLE.noDataAvailable)}
        />
        <TNSOButton
          variant={Variants.OutlinePrimary}
          onClick={exportData}
          disabled={isLoadingExport}
        >
          {isLoadingExport ? (
            <Spin indicator={<LoadingOutlined spin />} size="small" />
          ) : (
            <DownloadOutlined />
          )}
        </TNSOButton>
      </div>
    );
  }, [data, t, exportData, isLoadingExport, dataTable]);

  return (
    <div>
      <h5>
        <b>
          {t(
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL
              .historicalDataPeriod
          )}
        </b>
      </h5>
      {grid}
    </div>
  );
};
