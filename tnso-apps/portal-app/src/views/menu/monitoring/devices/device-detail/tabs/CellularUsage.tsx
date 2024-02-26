import React from 'react';
import { Divider } from 'antd';
import { HistoricalData } from '../../../../../../components/device/cellularUsage/HistoricalData';
import { store } from '../../../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { Col, Container, Row } from 'react-bootstrap';
import { DataConsumed } from '../../../../../../components/device/cellularUsage/DataConsumed';
import { DailyData } from '../../../../../../components/device/cellularUsage/DailyData';
import { PeriodSelected } from '../../../../../../components/device/cellularUsage/PeriodSelected';
import { DateHelper } from '../../../../../../helpers/shared/DateHelper';
import { useAsyncCall } from '../../../../../../hooks/useAsyncCallShared';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../../../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

export const CellularUsage: React.FC = observer(() => {
  const { cellularUsage } = store.device;
  const { deviceName } = useParams();
  const { t } = useTranslation();

  useAsyncCall(async () => {
    if (deviceName && cellularUsage.isWireless) {
      await cellularUsage.loadHistorical(deviceName);
      await cellularUsage.loadCurrent(deviceName);
      await cellularUsage.loadBillingPeriod(deviceName);
    }
  }, [t]);

  return (
    <Container fluid>
      <Row className="mb-2">
        <Col md="auto" className="align-self-center">
          <h6>
            <b>
              <Text text={t(TRANSLATION.SHARED.TABLE.billingPeriod)} />:
            </b>
          </h6>
        </Col>
        <Col md="auto">
          <PeriodSelected />
        </Col>
      </Row>
      {cellularUsage.current?.startDate ===
        cellularUsage.currentData?.startDate &&
        cellularUsage.currentDate && (
          <Row className="mb-2">
            <Col md="auto" className="align-self-center">
              <h6>
                <b>
                  <Text text={t(TRANSLATION.SHARED.date)} />:
                </b>
              </h6>
            </Col>
            <Col md="auto">
              {DateHelper.getDateFromTimestampWithTimeZoneWithoutTime(
                cellularUsage.currentDate,
                'UTC'
              )}
            </Col>
          </Row>
        )}
      <Row>
        <Col md={5}>
          <DataConsumed data={cellularUsage.current} />
        </Col>
        <Col md={7}>
          <DailyData />
        </Col>
      </Row>
      <Divider className="w-100" />
      <HistoricalData data={cellularUsage.historical} />
    </Container>
  );
});
