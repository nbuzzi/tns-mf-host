import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { observer } from "mobx-react";
import { store } from "../../../store/StoreMobx";
import { DateHelper } from "../../../helpers/shared/DateHelper";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TRANSLATION } from "../../../utils/const/translation";

export const PeriodSelected: React.FC = observer(() => {
  const { cellularUsage } = store.device;
  const { deviceName } = useParams();
  const { t } = useTranslation();
  const [itemSelected, setItemSelected] = useState<string>(t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.currentPeriod));
  useEffect(() => {
    setItemSelected(t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.currentPeriod));
  }, [t]);

  const handleSelected = useCallback(async (startDate: string, endDate: string, period: string): Promise<void> => {
    setItemSelected(period);
    if (period !== (t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.currentPeriod))) {
      cellularUsage.setIsClosedPeriod(true);
      await cellularUsage.loadBilling({ tnsDeviceName: deviceName, startDate, endDate });
      cellularUsage.current = cellularUsage.billing;
    } else {
      cellularUsage.setIsClosedPeriod(false);
      cellularUsage.current = cellularUsage.currentData;
      cellularUsage.billing = cellularUsage.billingData;
    }
  }, []);

  const dateMapper = useCallback((date: number) => {
    return DateHelper.getDateFromTimestampWithTimeZoneWithoutTime(date, "UTC");
  }, []);

  const renderItems = useMemo(() => {
    // delete the first period because is equal that current period
    const data = cellularUsage.billingPeriod?.slice(1);
    return data?.map((period, index) => (
      <Dropdown.Item
        key={period.name + index}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={(): Promise<void> =>
          handleSelected(
            period.startDate,
            period.endDate,
            `${dateMapper(Number(period.startDate))}
       - ${dateMapper(Number(period.endDate))}`
          )
        }>
        {dateMapper(Number(period.startDate))}
        {" - "}
        {dateMapper(Number(period.endDate))}
      </Dropdown.Item>
    ));
  }, [cellularUsage.billingPeriod]);

  return (
    <Dropdown title="Options" id="dropdown-menu" data-testid="period-selected-dropdown">
      <Dropdown.Toggle variant="primary" id="dropdown-month" className="btn-dropdown">
        {itemSelected}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ maxHeight: "16rem", overflowY: "auto" }}>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Dropdown.Item onClick={(): Promise<void> => handleSelected("", "",  t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.currentPeriod))}>{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL.currentPeriod)}</Dropdown.Item>
        {renderItems}
      </Dropdown.Menu>
    </Dropdown>
  );
});
