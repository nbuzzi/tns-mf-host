/* eslint-disable react/jsx-no-bind */
import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { DevicesReactTable } from '../../../../components/device/DevicesReactTable';
import { DevicesHeader } from '../../../../components/deviceStatusMenu/DevicesHeader';
import { Menu } from '../../../../components/treeMenu/TreeMenu';
import { Filters } from '../../../../components/shared/table/Filters';
import { useAsyncCall } from '../../../../hooks/useAsyncCall';
import { AuthHelper } from '../../../../helpers/auth/AuthHelper';
import { store } from '../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import MapView from '../../../../components/shared/maps/MapView';
import withAuthorization from '../../../../HOC/withAuthorization';
import { OptionsGeolocationTable } from '../../../../interfaces/devices/geolocation/geolocation';
import { builderDeviceQueryParams } from '../../../../store/device/tableConfig';
import { TRANSLATION } from '../../../../utils/const/translation';
import { TNSOCard, TNSOButton, Variants } from '@tnso/ui-components/dist';
import i18n from 'i18n-module/i18n';
import Text from 'i18n-module/i18nModule';

const DevicesSectionInternal: React.FC = () => {
  const isTreeMenuMobile = store.customizer.isTreeMenuMobile;
  const { devices, group } = store;
  const { geolocation, filter } = store.device;

  const { t } = useTranslation();
  const [textButton, setTextButton] = useState('');

  const handleViewGrid = useCallback(
    (event: MouseEvent<HTMLButtonElement> | undefined): void => {
      event?.preventDefault();
      filter.setIsSelectedTableView();
    },
    [filter.setIsSelectedTableView]
  );
  useEffect(() => {
    setTextButton(
      filter.selectedTableView
        ? i18n.t(
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.TOGGLEBUTTONVIEW.mapView
          )
        : i18n.t(
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.TOGGLEBUTTONVIEW.gridView
          )
    );
  }, [filter.selectedTableView, t]);

  const handleGeolocation = useCallback(async () => {
    const queryParams = builderDeviceQueryParams({
      tableFilters: { hasGeolocation: 'false' },
    });
    filter.setIsSelectedTableView();
    geolocation.setGeolocationOption(OptionsGeolocationTable.no);
    devices.setCurrentPage(1);
    await Promise.all([
      devices.loadData({ ...queryParams }),
      geolocation.loadData({ ...queryParams }),
      devices.loadDevicesStatus({ ...queryParams }),
    ]);
  }, [
    filter.setIsSelectedTableView,
    geolocation.setGeolocationOption,
    devices.loadData,
    geolocation.loadData,
    devices.loadDevicesStatus,
    devices.setCurrentPage,
  ]);

  const handleDevices = useCallback(async () => {
    builderDeviceQueryParams();
    group.setIsAllChecked();
    filter.resetAllFilters();
    await Promise.all([
      devices.loadData(),
      geolocation.loadData(),
      devices.loadDevicesStatus(),
      group.loadData(),
    ]);
  }, [
    group.setIsAllChecked,
    geolocation.loadData,
    filter.resetAllFilters,
    devices.loadData,
    devices.loadDevicesStatus,
    group.loadData,
  ]);

  const loadDataMethod = useCallback(async () => {
    const queryParams = builderDeviceQueryParams({
      currentPage: devices.currentPage - 1,
    });
    await Promise.all([
      devices.loadData({ ...queryParams }),
      geolocation.loadData({ ...queryParams }),
      group.loadData(),
      devices.loadDevicesStatus({ ...queryParams }),
      geolocation.loadHasGeolocation(),
    ]);
  }, []);
  useAsyncCall(loadDataMethod, []);

  return (
    <Container fluid className="section-head d-flex flex-column gap-2 w-100">
      <DevicesHeader />
      <div className="d-flex w-100 gap-3 flex-column-reverse flex-md-row wrapper">
        {!isTreeMenuMobile && (
          <Menu
            groups={group.groups}
            totalRecords={devices.data?.totalRecords}
          />
        )}
        <TNSOCard className="grid-map-container mb-0">
          <div className="row justify-content-between">
            <div
              className={`row col-9 my-auto ${
                (!group.checkedDevicesKeys ||
                  group.isAllCheckedDevices ||
                  group.groups?.length === group.groupSelected?.length) &&
                !filter.isFilteredTable
                  ? 'invisible'
                  : ''
              }`}
            >
              <Filters handleDevices={handleDevices} />
            </div>
            <div className="button-container row col-auto my-auto p-2">
              {/* eslint-disable-next-line*/}
              <TNSOButton
                variant={Variants.Primary}
                onClick={handleViewGrid as any}
              >
                {textButton}
              </TNSOButton>
            </div>
            <div className={`mx-2 ${filter.selectedTableView ? 'd-none' : ''}`}>
              <span onClick={handleGeolocation} role="button">
                <Text
                  text={t(
                    TRANSLATION.SIDEBAR.MONITORING.DEVICES
                      .devicesWithoutValidatedAddressDetails
                  )}
                />
                : <b>{geolocation.hasGeolocation?.count}</b>
              </span>
            </div>
          </div>
          <div className="row p-2">
            {filter.selectedTableView ? (
              <DevicesReactTable />
            ) : (
              <MapView showOnlyFilteredData />
            )}
          </div>
        </TNSOCard>
      </div>
    </Container>
  );
};

// to get allowed roles for routes, use the route name from Router.tsx
const DevicesSection = withAuthorization(
  observer(DevicesSectionInternal),
  AuthHelper.getAllowedRolesForRoute('devices')
);

export default DevicesSection;
