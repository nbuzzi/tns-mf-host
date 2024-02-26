import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { TNSOCard, TNSOSelector } from '@tnso/ui-components/dist';
import ReactApexChart from 'react-apexcharts';
import { observer } from 'mobx-react';

import { store } from '../../../store/StoreMobx';
import { useScreenSize } from '../../../hooks/useScreenSize';
import { ChartButtons } from '../ChartButtons';
import { Day, Month } from '../../../interfaces/devices/chart/chart';
import { MonthDateSelector } from '../../datePicker/MonthDateSelector';
import { UptimeService } from '../../../service/device/deviceDetail/UptimeService';
import Loader from '../../../layouts/loader/Loader';
import { UptimeHelper } from '../../../helpers/device/UptimeHelper';
import { TRANSLATION } from '../../../utils/const/translation';
import './UptimeChart.scss';

export enum MonthlyView {
  TwelveMonths = 'twelveMonths',
  SixMonths = 'sixMonths',
}

export const UptimeChart: React.FC = observer((): JSX.Element => {
  const [hasData, setHasData] = useState(false);

  const { t } = useTranslation();
  const { isMobile } = useScreenSize();
  const { deviceName } = useParams();
  const { uptime } = store.device;

  const [isMonthly, setIsMonthly] = useState(true);
  const [data, setData] = useState<Month[] | Day[] | undefined>(
    UptimeHelper.showByMonth(
      MonthlyView.SixMonths,
      UptimeHelper.sortedData(uptime.dataMonthly)
    )
  );
  const [selectedMonth, setSelectedMonth] = useState(
    ' ' + new Date().getFullYear()
  );
  const [optionSelected, setOptionSelected] = useState(MonthlyView.SixMonths);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDaily = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (
      event: MouseEventHandler<HTMLElement> | undefined,
      config: any
    ): Promise<void> => {
      const monthSelected =
        config.w.globals.labels[config.w.globals.selectedDataPoints[0]];
      const name =
        data?.[config.w.globals.selectedDataPoints?.[0]]?.month ?? '';
      setIsLoading(true);
      if (deviceName && monthSelected) {
        const response = await UptimeService.getDaily(deviceName, name);
        if (response?.data) {
          setData(response.data);
          setIsMonthly(false);
          setSelectedMonth(name);
        }
      }
    },
    [deviceName, data]
  );

  const handleViewMonthly = useCallback((): void => {
    setIsLoading(true);
    const sortedData = UptimeHelper.sortedData(uptime.dataMonthly);
    setData(UptimeHelper.showByMonth(optionSelected, sortedData));
    setIsMonthly(true);
  }, [optionSelected, uptime.dataMonthly]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (uptime.dataMonthly && uptime.dataMonthly.length > 0) {
      setHasData(true);
    } else {
      setHasData(false);
    }
  }, [store.device.uptime, uptime.dataMonthly]);

  const switchMonths = useCallback(
    (isLastSixMonths: boolean): void => {
      const sortedData = UptimeHelper.sortedData(uptime.dataMonthly);
      setData(
        UptimeHelper.showByMonth(
          isLastSixMonths ? MonthlyView.SixMonths : MonthlyView.TwelveMonths,
          sortedData
        )
      );
    },
    [uptime.dataMonthly, setData]
  );

  const onMonthSelected = useCallback(
    async (month: string) => {
      if (deviceName) {
        const response = await UptimeService.getDaily(deviceName, month);
        if (response?.data) {
          setData(response.data);
        }
        setSelectedMonth(month);
      }
    },
    [setSelectedMonth, deviceName]
  );

  const handleUsageSelect = useCallback((date: string | null): void => {
    if (date) {
      setOptionSelected(date as MonthlyView);
      switchMonths(date === MonthlyView.SixMonths);
    }
  }, []);

  const MonthlyItems = useMemo(() => {
    return [
      {
        label: t(
          TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME.UPTIMECARD
            .sixMonths
        ),
        value: MonthlyView.SixMonths,
      },
      {
        label: t(
          TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME.UPTIMECARD
            .twelveMonths
        ),
        value: MonthlyView.TwelveMonths,
      },
    ];
  }, [t, switchMonths]);

  return (
    <TNSOCard className=" w-100">
      <div className="row justify-content-between">
        <div className="col-3">
          <Card.Title className="title">
            {t(
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME
                .UPTIMECARD.deviceUptime
            )}
          </Card.Title>
        </div>
        {isMonthly ? (
          <Col md={{ offset: 10, span: 2 }}>
            <TNSOSelector
              options={MonthlyItems}
              onSelect={handleUsageSelect}
              value={optionSelected}
            />
          </Col>
        ) : null}
      </div>
      {!isMonthly && (
        <div className="row py-3">
          <div className="col-6">
            <MonthDateSelector
              data-testid="select-month-button"
              month={selectedMonth}
              onMonthSelected={onMonthSelected}
              switchView={handleViewMonthly}
              monthData={uptime.dataMonthly}
            />
          </div>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : !hasData ? (
        <div className="no-data d-flex justify-content-center align-items-center h-100">
          {' '}
          {t(TRANSLATION.ERROR.notAvailableMessage)}{' '}
        </div>
      ) : (
        <Card.Body className="py-2 ml-2 mr-2">
          <div
            className="chart-wrapper"
            style={{
              width: '100%',
              margin: '0 auto',
              height: '100%',
              marginLeft: '-2%',
            }}
          >
            <div className="row">
              <div className={!isMonthly ? 'col-12' : 'col-6'}>
                <ChartButtons />
              </div>
            </div>
            <ReactApexChart
              type="bar"
              series={[
                {
                  name: 'Monthly',
                  data:
                    data?.map(
                      (uptime: Month | Day): number => uptime.uptime ?? 0
                    ) || [],
                },
              ]}
              options={{
                tooltip: {
                  enabled: false,
                  cssClass: 'tooltip-custom',
                },
                chart: {
                  events: {
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
                    dataPointSelection: isMonthly ? handleViewDaily : () => {},
                  },
                  type: 'bar',
                  height: 350,
                  width: 100,
                  toolbar: {
                    show: false,
                  },
                },
                grid: {
                  borderColor: 'transparent',
                  padding: {
                    left: 10,
                    right: 10,
                  },
                },
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: '50%',
                    horizontal: false,
                    dataLabels: {
                      position: 'top',
                    },
                  },
                },
                dataLabels: {
                  enabled: true,
                  formatter: (val: number): string =>
                    UptimeHelper.formatUptime(val, isMonthly),
                  offsetY: -20,
                },
                stroke: {
                  show: false,
                  width: 1,
                  colors: ['transparent'],
                },
                xaxis: {
                  categories:
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data?.map((uptime: any): string =>
                      uptime.day
                        ? uptime.day ?? '-'
                        : t(
                            TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                              .UPTIME.MONTHSLEYEND[
                              uptime.month.toLowerCase() as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME.MONTHSLEYEND
                            ]
                          ) +
                          "'" +
                          uptime.year.toString().split('0')[1]
                    ) || [],
                  title: {
                    text: isMonthly
                      ? `${t(
                          TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                            .UPTIME.UPTIMECARD.days
                        )}`
                      : `${t(
                          TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                            .UPTIME.UPTIMECARD.month
                        )}: ${t(
                          TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                            .UPTIME.USAGESELECTOR[
                            selectedMonth.toLowerCase() as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME.USAGESELECTOR
                          ]
                        )}`,
                    offsetX: isMobile ? 0 : 300,
                    offsetY: isMobile ? 110 : 90,
                    style: {
                      color: '#FEFEFE',
                    },
                  },
                  labels: {
                    style: {
                      colors: '#FEFEFE',
                      fontSize: isMobile ? '9px' : '14px',
                    },
                  },
                },
                yaxis: {
                  max: 120,
                  tickAmount: 6,
                  title: {
                    rotate: isMobile ? 270 : 360,
                    text: t(
                      TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.UPTIME
                        .UPTIMECARD.serviceUptime
                    ),
                    offsetY: isMobile ? 0 : isMonthly ? -100 : -70,
                    offsetX: isMobile ? 0 : isMonthly ? -5 : -10,
                    style: {
                      color: '#FFFFFF',
                    },
                  },
                  labels: {
                    formatter: (value: number): string =>
                      value <= 100 ? value.toString() : '',
                    style: {
                      colors: '#FEFEFE',
                    },
                  },
                },
                fill: {
                  opacity: 1,
                },
              }}
              height="350px"
              width="100%"
              data-testid="uptime-apex-chart"
            />
          </div>
        </Card.Body>
      )}
    </TNSOCard>
  );
});
