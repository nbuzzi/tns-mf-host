import React from "react";
import { UnitConvertHelper } from "../../../helpers/shared/UnitConvertHelper";
import { DateHelper } from "../../../helpers/shared/DateHelper";
import { CellularUsage } from "../../../interfaces/devices/cellular/cellularUsage";
import { TRANSLATION } from "../../../utils/const/translation";
import { i18nInstance as i18n } from "../../../i18n";
import { TFunction } from "i18next";

export const historicalPeriod = [
  {
    dataIndex: "billingPeriod",
    title: "billingPeriod",
    key: "billingPeriod",
    ellipsis: true,
    render: (_: string, row: CellularUsage): string => {
      return `${DateHelper.getDateFromTimestampWithTimeZoneWithoutTime(Number(row.startDate), "UTC")} - ${DateHelper.getDateFromTimestampWithTimeZoneWithoutTime(
        Number(row.endDate),
        "UTC"
      )}`;
    }
  },
  {
    dataIndex: "planSize",
    title: "planSize",
    key: "planSize",
    ellipsis: true,
    render: (cel: number): string => {
      return `${UnitConvertHelper.convertBytesToMegaBytes(cel).toFixed(2)} ${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.MB)}`;
    }
  },
  {
    dataIndex: "txcnt",
    title: "txcnt",
    key: "txcnt",
    ellipsis: true,
    render: (cel: number): string => {
      return `${UnitConvertHelper.convertBytesToMegaBytes(cel).toFixed(2)} ${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.MB)}`;
    }
  },
  {
    dataIndex: "rxcnt",
    title: "rxcnt",
    key: "rxcnt",
    ellipsis: true,
    render: (cel: number): string => {
      return `${UnitConvertHelper.convertBytesToMegaBytes(cel).toFixed(2)} ${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.MB)}`;
    }
  },
  {
    dataIndex: "total",
    title: "total",
    key: "total",
    ellipsis: true,
    render: (cel: number): string => {
      return `${UnitConvertHelper.convertBytesToMegaBytes(cel).toFixed(2)} ${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.MB)}`;
    }
  },
  {
    dataIndex: "percent",
    title: "percent",
    key: "percent",
    ellipsis: true,
    render: (cel: number): JSX.Element => {
      return <span style={{ color: cel <= 100 ? "white" : "#FF1515" }}>{cel}%</span>;
    }
  },
  {
    dataIndex: "overage",
    title: "overage",
    key: "overage",
    ellipsis: true,
    render: (cel: number): string => {
      return `${UnitConvertHelper.convertBytesToMegaBytes(cel).toFixed(2)} ${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.MB)}`;
    }
  }
];

export const columns = {
  historicalPeriod
};

// eslint-disable-next-line
export const cellularUsageTranslatedData = (t: TFunction, data: CellularUsage[]): CellularUsage[] => {
  return data?.map((item) => {
    return {
      ...item,
      formatter: (cel: number): string => {
        return `${UnitConvertHelper.convertBytesToMegaBytes(cel).toFixed(2)} ${t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.MB)}`;
      }
    };
  });
};
