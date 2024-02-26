import React, { useCallback, useMemo, useState } from 'react';
import { store } from '../../store/StoreMobx';
import { observer } from 'mobx-react';
import { Device, DeviceTable } from '../../interfaces/devices/devices';
import {
  builderDeviceQueryParams,
  columns,
} from '../../store/device/tableConfig';
import { useNavigate } from 'react-router-dom';
import { TNSOGrid } from '@tnso/ui-components/dist';
import { TranslationHelper } from '../../helpers/shared/TranslationHelper';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useExportDataTable } from '../../hooks/useExportDataTable';
import { DevicesResponse } from '../../interfaces/devices/response/response';
import { DeviceService } from '../../service/device/DeviceService';
import { TRANSLATION } from '../../utils/const/translation';
import { MapperHelper } from '../../helpers/shared/MapperHelper';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const DevicesReactTable: React.FC = observer((): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const { devices } = store;
  const totalRecords = useMemo(
    () =>
      devices?.data?.totalRecords && devices.data?.totalRecords > 0
        ? devices.data?.totalRecords
        : undefined,
    [devices?.data?.totalRecords]
  );
  const handleExportData = useExportDataTable<DeviceTable, DevicesResponse>(
    store.devices.data?.totalRecords ?? 0,
    10,
    DeviceService,
    builderDeviceQueryParams,
    `${t(TRANSLATION.SIDEBAR.MENU.devices)}`,
    MapperHelper.mapDevices
  );

  const handleChangePage = useCallback(
    async (page: number): Promise<void> => {
      setLoading(true);
      const params = builderDeviceQueryParams({
        currentPage: page - 1,
        recordsPerPage: 10,
      });
      await devices.loadData(params);
      setLoading(false);
    },
    [devices]
  );

  const handleExport = useCallback(async (): Promise<void> => {
    setIsLoadingExport(true);
    await handleExportData();
    setIsLoadingExport(false);
  }, [handleExportData]);

  const handleSelectRow = useCallback(
    async (row: Device): Promise<void> => {
      // Navigate to the detail page for the selected ticket
      navigate(`/monitoring/devices/device-detail/${row.tnsDeviceName}`);
    },
    [devices, navigate]
  );

  const dataTable = useMemo(() => {
    return (
      devices.data?.devices?.map((device, index) => ({
        key: device.tnsDeviceName + index,
        ...device,
      })) ?? []
    );
  }, [devices.data?.devices]);

  const grid = useMemo(() => {
    return (
      <TNSOGrid
        themeSelected="dark"
        currentPage={devices.currentPage}
        columns={TranslationHelper.columnsTranslation(
          columns.devices as unknown as ColumnsType[]
        )}
        dataSource={TranslationHelper.dataTranslation(dataTable, [
          'hasGeolocation',
          'operationalStatus',
          'connectivityStatus',
        ])}
        totalRecords={totalRecords}
        showPagination={true}
        handleGoToPage={handleChangePage}
        handleSelectRow={handleSelectRow}
        loading={loading}
        iconExport={
          isLoadingExport ? (
            <Spin indicator={<LoadingOutlined spin />} size="small" />
          ) : (
            <DownloadOutlined />
          )
        }
        isLoadingExport={isLoadingExport}
        emptyMessage={t(TRANSLATION.SHARED.DATATABLE.noDataAvailable)}
        onExport={handleExport}
        //  eslint-disable-next-line
        onChange={columns.handleSort}
      />
    );
  }, [
    handleChangePage,
    handleSelectRow,
    loading,
    t,
    devices.data?.devices,
    totalRecords,
    devices.currentPage,
    handleExport,
    isLoadingExport,
    dataTable,
  ]);

  return grid;
});
