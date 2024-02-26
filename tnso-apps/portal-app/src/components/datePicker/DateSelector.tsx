import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../utils/const/translation';
import { Dropdown } from 'react-bootstrap';
import Text from 'i18n-module/i18nModule';
import { store } from '../../store/StoreMobx';
import { observer } from 'mobx-react';

export enum LabelDateSelectorType {
  Label = 'month/Year',
}

export const DateSelector: React.FC = observer((): JSX.Element => {
  const isDarkMode = store.customizer.isDark;

  const { t } = useTranslation();

  const currentDate = useMemo(() => new Date(), []);
  const [dateSelected, setDateSelected] = useState<string>(
    LabelDateSelectorType.Label
  );
  const currentYear =
    dateSelected === LabelDateSelectorType.Label
      ? ''
      : currentDate.getFullYear();

  const months = useMemo(() => {
    return [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ];
  }, []);

  const monthItems = useMemo(() => {
    return (
      <Dropdown.Menu>
        {months &&
          months.map((item) => (
            <Dropdown.Item eventKey={item} key={item}>
              <Text
                text={
                  TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME
                    .USAGESELECTOR[
                    item as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME.USAGESELECTOR
                  ] + ` ${currentDate.getFullYear()}`
                }
              />
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    );
  }, [currentDate, months, t]);

  const handleUsageSelect = useCallback((date: string | null): void => {
    if (date) {
      setDateSelected(date.toLowerCase());
    }
  }, []);

  return (
    <Dropdown
      onSelect={handleUsageSelect}
      data-testid="date-selector-component"
    >
      <Dropdown.Toggle
        variant={isDarkMode ? 'primary' : 'secondary'}
        id="dropdown-basic"
        className="btn-label-date-picker"
        size="sm"
      >
        <Text
          text={
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME
              .USAGESELECTOR[
              dateSelected as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME.USAGESELECTOR
            ] + ` ${currentYear}`
          }
        />
      </Dropdown.Toggle>
      {monthItems}
    </Dropdown>
  );
});
