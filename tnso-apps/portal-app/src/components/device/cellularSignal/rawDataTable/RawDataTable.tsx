import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RawData,
  SignalDataTable,
} from '../../../../interfaces/devices/chart/chart';
import { COLORS } from '../../../../utils/const/colors';
import { store } from '../../../../store/StoreMobx';
import { DateHelper } from '../../../../helpers/shared/DateHelper';
import { observer } from 'mobx-react';
import { Period } from '../../../../interfaces/devices/cellular/cellularSignal';
import { RawDataBody } from './RawDataBody';
import { TECHNOLOGY_TYPE } from '../../../../utils/const/technologyType';
import { TRANSLATION } from '../../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';
interface ChartsProps {
  interval: Period;
}
export const RawDataTable: React.FC<ChartsProps> = observer(({ interval }) => {
  const { cellularSignal } = store.device;
  const { t } = useTranslation();
  const [dataTable, setData] = useState<RawData>();
  const columnsWidth = useMemo(
    () => `${100 / (cellularSignal.data ? cellularSignal.data.length : 1)}%`,
    [dataTable]
  );
  const isDaily = interval === Period.Daily;

  const dateTime = useCallback(
    (date: string) => {
      const newDate = isDaily
        ? DateHelper.formatTimestampInHours(date, store.auth.userInfo?.timeZone)
        : DateHelper.formatTimestampInDays(date, store.auth.userInfo?.timeZone);
      return newDate;
    },
    [t, isDaily]
  );

  const returnBody = useCallback(
    (data: SignalDataTable) => {
      {
        return data.signal.map((item, index) => {
          const statusSignal = data.statusSignal[index];
          return (
            <RawDataBody
              valueSignal={item}
              key={index}
              statusSignal={statusSignal}
            />
          );
        });
      }
    },
    [dataTable, t]
  );
  useEffect(() => {
    if (cellularSignal.rawTNSSignal) {
      setData(cellularSignal.rawTNSSignal.current ?? []);
    }
  }, [cellularSignal.rawTNSSignal.current]);

  return dataTable &&
    dataTable.time &&
    dataTable.data &&
    dataTable.data.length > 0 &&
    cellularSignal.data &&
    cellularSignal.data?.length > 0 ? (
    <div className="w-100 overflow-auto">
      <table>
        <thead
          className="border"
          style={{
            color: COLORS.TABLE.HEADER.TEXTDARK,
            backgroundColor: COLORS.TABLE.HEADER.BGDARK,
          }}
        >
          <tr>
            <th className="p-2  text-center">
              <small>
                <Text text={TRANSLATION.SHARED.TABLE.technology} />
              </small>
            </th>
            <th className="p-2 text-center">
              <small>
                <Text text={TRANSLATION.SHARED.TABLE.signalIndicator} />
              </small>
            </th>
            {cellularSignal.data?.map((date, index) => (
              <th
                className="p-1  text-center"
                key={index}
                style={{ width: columnsWidth }}
              >
                <small>{dateTime(date.dateTime)}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border raw-data-table">
          <tr>
            <th className="border p-2 text-center" rowSpan={4}>
              <small>{TECHNOLOGY_TYPE.FOURG}</small>
            </th>
            <th className="border text-center">
              <small>
                {TECHNOLOGY_TYPE.FOURG} {TECHNOLOGY_TYPE.RSSI}
              </small>
            </th>
            {returnBody(dataTable.data[2].data[0])}
          </tr>
          <tr>
            <th className="border text-center">
              <small>{TECHNOLOGY_TYPE.RSRP}</small>
            </th>
            {returnBody(dataTable.data[2].data[1])}
          </tr>
          <tr>
            <th className="border p-1 text-center">
              <small>{TECHNOLOGY_TYPE.RSRQ}</small>
            </th>
            {returnBody(dataTable.data[2].data[2])}
          </tr>
          <tr>
            <th className="border p-1 text-center">
              <small>{TECHNOLOGY_TYPE.SINR}</small>
            </th>
            {returnBody(dataTable.data[2].data[3])}
          </tr>
          <tr>
            <th className="border p-1 text-center" rowSpan={3}>
              <small>{TECHNOLOGY_TYPE.THREEG}</small>
            </th>
            <th className="border p-1 text-center">
              <small>
                {TECHNOLOGY_TYPE.THREEG} {TECHNOLOGY_TYPE.RSSI}
              </small>
            </th>
            {returnBody(dataTable.data[1].data[0])}
          </tr>
          <tr>
            <th className="border p-1 text-center">
              <small>{TECHNOLOGY_TYPE.RSCP}</small>
            </th>
            {returnBody(dataTable.data[1].data[1])}
          </tr>
          <tr>
            <th className="border p-1 text-center">
              <small>{TECHNOLOGY_TYPE.ECIO}</small>
            </th>
            {returnBody(dataTable.data[1].data[2])}
          </tr>
          <tr>
            <th className="border p-1 text-center" rowSpan={1}>
              <small>{TECHNOLOGY_TYPE.TWOG}</small>
            </th>
            <th className="border p-1 text-center">
              <small>
                {TECHNOLOGY_TYPE.TWOG} {TECHNOLOGY_TYPE.RSSI}
              </small>
            </th>
            {returnBody(dataTable.data[0].data[0])}
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center w-100 p-4 m-4">
      <Text
        text={
          TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL
            .thereIsNoData
        }
      />
    </div>
  );
});
