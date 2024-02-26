import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { TNSOCard } from '@tnso/ui-components/dist';
import { observer } from 'mobx-react';

import {
  DataSeries,
  Period,
} from '../../../interfaces/devices/cellular/cellularSignal';
import { ScatterChart } from '../../../components/chart/ScatterChart';
import { store } from '../../../store/StoreMobx';
import signalIconHigh from '../../../assets/images/devices/signal-icon-high.svg';
import signalIconLow from '../../../assets/images/devices/signal-icon-low.svg';
import { TRANSLATION } from '../../../utils/const/translation';
import i18n from 'i18n-module/i18n';
import Text from 'i18n-module/i18nModule';

interface Props {
  interval: Period;
}

export const LegacyView: React.FC<Props> = observer(({ interval }) => {
  const { cellularSignal } = store.device;
  const [axis, setAxis] = useState(
    cellularSignal?.data?.map((item) => item.dateTime) ?? []
  );
  const [dataHigh, setDataHigh] = useState<DataSeries>({
    name: i18n.t(
      TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD.high
    ),
    data: [],
  });
  const [dataLow, setDataLow] = useState<DataSeries>({
    name: i18n.t(
      TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD.low
    ),
    data: [],
  });

  const iconHigh = new Image();
  const iconLow = new Image();
  iconHigh.src = signalIconHigh;
  iconLow.src = signalIconLow;

  useEffect(() => {
    setAxis(cellularSignal?.data?.map((item) => item.dateTime) ?? []);
    setDataHigh({
      ...dataHigh,
      data: cellularSignal.signalStrength.map((item) => item.high),
    });
    setDataLow({
      ...dataLow,
      data: cellularSignal.signalStrength.map((item) => item.low),
    });
  }, [cellularSignal?.signalStrength]);

  return (
    <TNSOCard>
      <Card.Body>
        <Row className="mt-4">
          <h5>
            <b>
              <Text
                text={
                  TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                    .signalStrength
                }
              />
            </b>
          </h5>
        </Row>
        <Row>
          <Col md={12}>
            {cellularSignal.data && cellularSignal.data.length > 0 ? (
              <ScatterChart
                series={[dataLow, dataHigh]}
                categories={axis}
                interval={interval ?? Period.Daily}
              />
            ) : (
              <div
                className="d-flex justify-content-center align-items-center p-4 m-4"
                data-testid="error-message-legacy-view"
              >
                <Text
                  text={
                    TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                      .CELLULARSIGNAL.thereIsNoData
                  }
                />
              </div>
            )}
          </Col>
        </Row>
      </Card.Body>
    </TNSOCard>
  );
});
