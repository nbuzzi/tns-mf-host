import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row } from 'react-bootstrap';
import { TNSOCard } from '@tnso/ui-components/dist';

import { PieChart } from '../../../components/chart/PieChart';
import { LegendUsage } from './LegendUsage';
import { CellularUsage } from '../../../interfaces/devices/cellular/cellularUsage';
import { UnitConvertHelper } from '../../../helpers/shared/UnitConvertHelper';
import { TRANSLATION } from '../../../utils/const/translation';

interface Props {
  data?: CellularUsage;
}

export const DataConsumed: React.FC<Props> = ({ data }) => {
  const planSize = data?.planSize
    ? UnitConvertHelper.convertBytesToMegaBytes(data?.planSize).toFixed(2)
    : 0;
  const total = data?.total
    ? UnitConvertHelper.convertBytesToMegaBytes(data?.total).toFixed(2)
    : 0;
  const remaining =
    data?.planSize && data?.total
      ? UnitConvertHelper.convertBytesToMegaBytes(data?.planSize - data?.total)
      : 0;
  const txData = data?.txcnt
    ? UnitConvertHelper.convertBytesToMegaBytes(data?.txcnt).toFixed(2)
    : 0;
  const rxData = data?.rxcnt
    ? UnitConvertHelper.convertBytesToMegaBytes(data?.rxcnt).toFixed(2)
    : 0;
  const dataPie = [
    Number(txData),
    remaining < 0 ? 0 : Number(remaining),
    Number(rxData),
  ];
  const { t } = useTranslation();

  return (
    <TNSOCard className="h-100">
      <Card.Body className="h-100">
        {data?.planSize ? (
          <>
            <Row>
              <Col className="text-center">
                <h5>
                  <b>
                    {t(
                      TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                        .CELLULARSIGNAL.percentOfDataConsumed
                    )}
                  </b>
                </h5>
              </Col>
            </Row>
            <Row className="mt-3">
              <Row>
                <Col md={12} className="d-flex justify-content-start gap-4">
                  <span>
                    {t(
                      TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                        .CELLULARSIGNAL.deviceDataPlan
                    )}
                    :{' '}
                    <b>
                      {planSize}{' '}
                      {t(
                        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                          .CELLULARSIGNAL.MB
                      )}
                    </b>
                  </span>
                </Col>
                <Col md={12} className="d-flex justify-content-start gap-4">
                  <span>
                    {t(
                      TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                        .CELLULARSIGNAL.totalDataConsumed
                    )}
                    :{' '}
                    <b>
                      {total}{' '}
                      {t(
                        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                          .CELLULARSIGNAL.MB
                      )}
                    </b>
                  </span>
                </Col>
              </Row>
              <Row className="align-content-center">
                <Col md={1} xl={2} />
                <Col md={12} className="d-flex justify-content-center">
                  <PieChart series={dataPie} />
                </Col>
              </Row>
              <Col md={12} className="d-flex justify-content-center my-2">
                {data.overage && data.overage > 0 ? (
                  <small className="text-orange">
                    <b>
                      {t(
                        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                          .CELLULARSIGNAL.overagePredicted
                      )}{' '}
                      {UnitConvertHelper.convertBytesToMegaBytes(
                        data.predictedOverage
                      ).toFixed(2)}{' '}
                      {t(
                        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                          .CELLULARSIGNAL.MB
                      )}
                    </b>
                  </small>
                ) : (
                  <small />
                )}
                <br />
                {data.overage && data.overage > 0 ? (
                  <small className="text-red">
                    <b>
                      {' '}
                      {t(
                        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                          .CELLULARSIGNAL.dataOverage
                      )}{' '}
                      {UnitConvertHelper.convertBytesToMegaBytes(
                        data.overage
                      ).toFixed(2)}{' '}
                      {t(
                        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                          .CELLULARSIGNAL.MB
                      )}
                    </b>
                  </small>
                ) : (
                  <small />
                )}
              </Col>
              <Row>
                <Col md={12} xl={12}>
                  <LegendUsage />
                </Col>
              </Row>
            </Row>
          </>
        ) : (
          <div
            className="w-100 h-100 d-flex justify-content-center align-items-center"
            data-testid="error-message-data-consumed"
          >
            <span>{t(TRANSLATION.SHARED.TABLE.noDataFound)}</span>
          </div>
        )}
      </Card.Body>
    </TNSOCard>
  );
};
