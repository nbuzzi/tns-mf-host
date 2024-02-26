import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row } from 'react-bootstrap';
import { DownloadOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { utils } from 'xlsx';

import { RawDataTable } from './rawDataTable/RawDataTable';
import { LineChart } from '../../../components/chart/LineChart';
import { store } from '../../../store/StoreMobx';
import { Period } from '../../../interfaces/devices/cellular/cellularSignal';
import { SignalQuality } from './SignalQuality';
import { MapperHelper } from '../../../helpers/shared/MapperHelper';
import {
  ExportXLSLHelper,
  TypeFile,
} from '../../../helpers/shared/ExportXLSLHelper';
import { TRANSLATION } from '../../../utils/const/translation';
import { Variants, TNSOCard } from '@tnso/ui-components/dist';
import { useParams } from 'react-router-dom';
import TNSODropdownComponent from './TNSODropdownComponent';
import i18n from 'i18n-module/i18n';
import Text from 'i18n-module/i18nModule';

interface Props {
  interval: Period;
}

export const DefaultView: React.FC<Props> = observer(({ interval }) => {
  const { t } = useTranslation();
  const { deviceName } = useParams();
  const { cellularSignal } = store.device;
  const [axis, setAxis] = useState(
    cellularSignal?.data?.map((item) => item.dateTime) ?? []
  );
  const [isLoadingExport, setIsLoadingExport] = useState(false);

  const exportSignalData = useCallback(async () => {
    setIsLoadingExport(true);
    const data = cellularSignal.data;
    if (data) {
      const wb = utils.book_new();
      const signalReport = await cellularSignal.downloadSignalReport(
        data[0].name
      );
      if (signalReport) {
        const dataParsed = ExportXLSLHelper.parseCsvString(signalReport);
        ExportXLSLHelper.addSheetToBook(
          wb,
          dataParsed,
          i18n.t(TRANSLATION.EXPORT.signalReport)
        );
      }
      setIsLoadingExport(false);
      ExportXLSLHelper.exportToXLSL(
        wb,
        `${deviceName}_${i18n.t(TRANSLATION.EXPORT.cellularSignalExport)}_${t(
          TRANSLATION.EXPORT.signalReport
        )}`,
        TypeFile.CSV
      );
    }
  }, [cellularSignal.data]);

  const exportRawData = useCallback(async () => {
    setIsLoadingExport(true);
    const data = cellularSignal.data;
    if (data) {
      const dataMapped = MapperHelper.mapRawDataExport(
        data,
        interval ?? Period.Daily
      );
      const wb = utils.book_new();
      ExportXLSLHelper.addSheetToBook(
        wb,
        dataMapped,
        i18n.t(TRANSLATION.EXPORT.dataReportExport)
      );
      setIsLoadingExport(false);
      ExportXLSLHelper.exportToXLSL(
        wb,
        `${deviceName}_${i18n.t(TRANSLATION.EXPORT.cellularSignalExport)}_${t(
          TRANSLATION.EXPORT.rawDataReport
        )}`,
        TypeFile.CSV
      );
    }
  }, [cellularSignal.data]);

  useEffect(() => {
    setAxis(cellularSignal?.data?.map((item) => item.dateTime) ?? []);
  }, [cellularSignal?.data]);

  return cellularSignal.tnsSignal?.current &&
    cellularSignal.rawTNSSignal?.current ? (
    <TNSOCard>
      <Card.Body>
        <Row>
          <Col md="auto" className="align-self-center">
            <h5>
              <b>
                <Text
                  text={
                    TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                      .SIGNALCARD.celularSignalDetails
                  }
                />
              </b>
            </h5>
          </Col>
        </Row>
        <Row>
          {cellularSignal.tnsSignal.current.length < 10 ? (
            <>
              <Col md={1} />
              <Col md={11}>
                {
                  <LineChart
                    series={cellularSignal.tnsSignal.current}
                    categories={axis}
                    interval={interval ?? Period.Daily}
                  />
                }
              </Col>
            </>
          ) : (
            <>
              <span className="white-space" />
              <Col>
                {
                  <LineChart
                    series={cellularSignal.tnsSignal.current}
                    categories={axis}
                    interval={interval ?? Period.Daily}
                  />
                }
              </Col>
            </>
          )}
        </Row>
        <Row>
          <h5>
            <b>
              <Text
                text={
                  TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                    .CELLULARSIGNAL.signalDetailsGraph
                }
              />
            </b>
          </h5>
        </Row>
        <Row>
          <RawDataTable interval={interval ?? Period.Daily} />
        </Row>
        <Row>
          <Col>
            <SignalQuality />
          </Col>
        </Row>
        {cellularSignal.data && cellularSignal.data?.length > 0 && (
          <TNSODropdownComponent
            variant={Variants.OutlinePrimary}
            isLoading={isLoadingExport}
            disabled={isLoadingExport}
            options={[
              {
                label: i18n.t(TRANSLATION.EXPORT.signalReport),
                onClick: exportSignalData,
              },
              {
                label: i18n.t(TRANSLATION.EXPORT.dataReportExport),
                onClick: exportRawData,
              },
            ]}
          >
            <DownloadOutlined />
          </TNSODropdownComponent>
        )}
      </Card.Body>
    </TNSOCard>
  ) : null;
});
