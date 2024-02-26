import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row } from 'react-bootstrap';
import { TNSOCard } from '@tnso/ui-components/dist';
import { observer } from 'mobx-react';

import { BarChart } from '../../../components/chart/BarChart';
import { LegendDaily } from './LegendDaily';
import { store } from '../../../store/StoreMobx';
import { TRANSLATION } from '../../../utils/const/translation';

export const DailyData: React.FC = observer(() => {
  const { cellularUsage } = store.device;
  const { t } = useTranslation();

  return (
    <TNSOCard className="h-100">
      <Card.Body>
        {cellularUsage.billing &&
        cellularUsage.billing?.dailyDeviceUsage.length > 0 ? (
          <>
            <Row>
              <Col className="text-center">
                <h5>
                  <b>
                    {t(
                      TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                        .CELLULARSIGNAL.dailyDataUsageTracker
                    )}
                  </b>
                </h5>
              </Col>
            </Row>
            <Row className="container-bar d-flex position-relative">
              <div className="position-absolute vertical-div">
                <h5>
                  {t(
                    TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                      .CELLULARSIGNAL.megabytesMB
                  )}
                </h5>
              </div>
              <Col md={1} />
              <Col md={11}>
                <BarChart
                  data={cellularUsage.billing?.dailyDeviceUsage.map(
                    (value) => value.total
                  )}
                  statusData={cellularUsage.billing?.dailyDeviceUsage.map(
                    (value) => value.status
                  )}
                  categories={cellularUsage.billing?.dailyDeviceUsage.map(
                    (value) => value.date
                  )}
                />
              </Col>
            </Row>
            <Row className="legend-daily py-1">
              <LegendDaily isClosedPeriod={cellularUsage.isClosedPeriod} />
            </Row>
          </>
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <span>{t(TRANSLATION.SHARED.TABLE.noDataFound)}</span>
          </div>
        )}
      </Card.Body>
    </TNSOCard>
  );
});
