import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DefaultView } from '../../../../../../components/device/cellularSignal/DefaultView';
import { Container, Dropdown } from 'react-bootstrap';
import { ViewSelected } from '../../../../../../components/device/cellularSignal/ViewSelected';
import { LegacyView } from '../../../../../../components/device/cellularSignal/LegacyView';
import { Period } from '../../../../../../interfaces/devices/cellular/cellularSignal';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { store } from '../../../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { useAsyncCall } from '../../../../../../hooks/useAsyncCallShared';
import { TRANSLATION } from '../../../../../../utils/const/translation';
import moment from 'moment';
import { Language } from '../../../../../../store/shared/Shared';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

export const enum Views {
  DefaultView = 'default',
  LegacyView = 'legacy',
}

export const CellularSignal: React.FC = observer(() => {
  const { t } = useTranslation();
  const { cellularSignal } = store.device;
  const { deviceName } = useParams();
  type SwitchButtonViewKeys =
    keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD.SWITCHBUTTONVIEW;
  const [viewActive, setViewActive] = useState<SwitchButtonViewKeys>(
    Views.DefaultView as SwitchButtonViewKeys
  );
  const [interval, setInterval] = useState<Period>(Period.Daily);

  const intervalItems = useMemo(() => {
    return (
      <Dropdown.Menu>
        <Dropdown.Item eventKey={Period.Daily}>
          <Text
            text={t(
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL
                .lastdaily
            )}
          />
        </Dropdown.Item>
        <Dropdown.Item eventKey={Period.Weekly}>
          <Text
            text={t(
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL
                .lastweekly
            )}
          />
        </Dropdown.Item>
        <Dropdown.Item eventKey={Period.Monthly}>
          <Text
            text={t(
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL
                .lastmonthly
            )}
          />
        </Dropdown.Item>
      </Dropdown.Menu>
    );
  }, [t]);

  useEffect(() => {
    if (localStorage.getItem('language') === Language.ph) {
      moment.defineLocale('tl-ph', {
        monthsShort: [
          'Ene',
          'Peb',
          'Mar',
          'Abr',
          'May',
          'Hun',
          'Hul',
          'Ago',
          'Set',
          'Okt',
          'Nob',
          'Dis',
        ],
        weekdaysShort: ['Lun', 'Mar', 'Miy', 'Huw', 'Biy', 'Sab', 'Lin'],
      });
    }
  }, [t]);

  const switchInterval = useCallback(
    async (value: string | null): Promise<void> => {
      if (value && deviceName) {
        setInterval(value as Period);
        await cellularSignal.loadData(deviceName, value as Period);
      }
    },
    []
  );

  useAsyncCall(async () => {
    if (deviceName) {
      await cellularSignal.loadData(deviceName, Period.Daily);
    }
  }, []);

  return (
    <Container fluid>
      <div className="mb-2 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <h6 className="m-0 p-0">
            <Text
              text={t(
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                  .CELLULARSIGNAL.signalInterval
              )}
            />
          </h6>
          <Dropdown onSelect={switchInterval}>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="btn-label-date-picker"
              size="sm"
            >
              {t(`last${interval ?? Period.Daily}`)}
            </Dropdown.Toggle>
            {intervalItems}
          </Dropdown>
        </div>
        <div>
          <ViewSelected
            viewSelected={i18n.t(
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                .SWITCHBUTTONVIEW[viewActive]
            )}
            handleItemSelect={setViewActive}
          />
        </div>
      </div>
      {viewActive === Views.DefaultView ? (
        <DefaultView interval={interval ?? Period.Daily} />
      ) : (
        <LegacyView interval={interval ?? Period.Daily} />
      )}
    </Container>
  );
});
