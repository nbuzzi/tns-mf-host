import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../utils/const/translation';
import { Month } from '../../interfaces/devices/chart/chart';
import { UptimeHelper } from '../../helpers/device/UptimeHelper';
import { TNSOSelector } from '@tnso/ui-components/dist';
import i18n from 'i18n-module/i18n';

interface MonthDateSelectorProps {
  month?: string;
  onMonthSelected?: (month: string) => void;
  switchView: () => void;
  monthData?: Month[];
}

export const MonthDateSelector: React.FC<MonthDateSelectorProps> = ({
  month,
  onMonthSelected,
  switchView,
  monthData,
}): JSX.Element => {
  const { t } = useTranslation();
  const currentDate = useMemo(() => new Date(), []); // e.g. 2021-10-01
  const currentYear = useMemo(() => {
    if (monthData) {
      const dataSelected = monthData.find(
        (data) => data.month.toLowerCase() === month?.toLowerCase()
      );
      return dataSelected?.year ?? currentDate.getFullYear();
    }
  }, [monthData, currentDate, month]); // e.g. 2022

  const [dateSelected, setDateSelected] = useState(
    month
      ? i18n.t(
          TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME
            .USAGESELECTOR[
            month.toLowerCase() as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME.USAGESELECTOR
          ]
        ) + ` ${currentYear}`
      : i18n.t(
          TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME
            .USAGESELECTOR.label
        )
  );

  const monthsData = useMemo(
    () => UptimeHelper.sortedDataForDropdown(monthData),
    [monthData]
  );

  const monthItems = useMemo(() => {
    return (
      monthsData && [
        {
          label: i18n.t(
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME
              .USAGESELECTOR.switchView
          ),
          value: '',
        },
        ...monthsData.map((item) => ({
          label:
            i18n.t(
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME
                .USAGESELECTOR[
                item.month.toLowerCase() as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME.USAGESELECTOR
              ]
            ) + ` ${item.year}`,
          value: item.month,
        })),
      ]
    );
  }, [monthsData, t, switchView]);

  const handleUsageSelect = useCallback(
    (date: string | null): void => {
      if (date && date !== '') {
        const monthDate = date[0].toUpperCase() + date.slice(1);
        onMonthSelected?.(monthDate);
      }
      switchView();
    },
    [onMonthSelected]
  );

  useEffect(() => {
    if (month) {
      setDateSelected(
        i18n.t(
          TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME
            .USAGESELECTOR[
            month.toLowerCase() as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME.USAGESELECTOR
          ]
        ) + ` ${currentYear}`
      );
    }
  }, [month, t, currentYear]);

  return (
    <TNSOSelector
      options={monthItems}
      onChange={handleUsageSelect}
      value={dateSelected}
    />
  );
};
