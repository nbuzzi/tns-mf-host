import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { COLORS } from '../../utils/const/colors';
import { store } from '../../store/StoreMobx';
import { observer } from 'mobx-react';
import { DateHelper } from '../../helpers/shared/DateHelper';
import { Period } from '../../interfaces/devices/cellular/cellularSignal';
import { DataSeries } from '../../interfaces/devices/chart/chart';
import { TRANSLATION } from '../../utils/const/translation';
import i18n from 'i18n-module/i18n';
import Text from 'i18n-module/i18nModule';

interface ChartsProps {
  series: DataSeries[];
  categories: string[];
  interval: string;
}

export const LineChart: React.FC<ChartsProps> = observer(
  ({ series, categories, interval }) => {
    const isDarkMode = store.customizer.isDark;
    const isDaily = interval === Period.Daily;

    const labels = [
      i18n.t(
        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD.noSignal
      ),
      i18n.t(
        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD.poor
      ),
      i18n.t(
        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD.fair
      ),
      i18n.t(
        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD.good
      ),
      i18n.t(
        TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD.excellent
      ),
    ];

    return series.length > 0 ? (
      <div className="w-100 d-flex flex-column gap-0">
        <ReactApexChart
          type="line"
          options={{
            tooltip: {
              cssClass: 'tooltip-custom',
            },
            chart: {
              toolbar: {
                show: false,
              },
              height: 350,
              animations: {
                enabled: false,
              },
              background: '#131b32',
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'straight',
              width: 2.5,
            },
            grid: {
              borderColor: isDarkMode
                ? COLORS.CHARTS.LINE.GRAY
                : COLORS.CHARTS.LINE.DARK_GRAY,
              xaxis: {
                lines: {
                  show: true,
                },
              },
              yaxis: {
                lines: {
                  show: true,
                },
              },
            },
            xaxis: {
              categories: categories.map((item): string => {
                const date = isDaily
                  ? DateHelper.formatTimestampInHours(
                      item,
                      store.auth.userInfo?.timeZone
                    )
                  : DateHelper.formatTimestampInDays(
                      item,
                      store.auth.userInfo?.timeZone
                    );
                return date;
              }),
            },
            yaxis: {
              min: 0,
              max: 4,
              tickAmount: 4,
              title: {
                text: i18n.t(
                  TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                    .signalStrength
                ),
              },
              labels: {
                formatter: (_, index: number): string => {
                  const label = labels[index];
                  return label;
                },
                minWidth: 100,
              },
            },
            colors: [COLORS.CHARTS.LINE.GREY],
            annotations: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              points: categories.map((item, index): any => {
                const date =
                  interval === Period.Daily
                    ? DateHelper.formatTimestampInHours(
                        item,
                        store.auth.userInfo?.timeZone
                      )
                    : DateHelper.formatTimestampInDays(
                        item,
                        store.auth.userInfo?.timeZone
                      );
                if (index <= series.length - 1) {
                  return {
                    x: date,
                    y: series[index].data,
                    strokeDashArray: 0,
                    borderColor:
                      COLORS.CHARTS.LINE[
                        series[index].name.split(
                          ' '
                        )[0] as keyof typeof COLORS.CHARTS.LINE
                      ],
                    label: {
                      borderColor:
                        COLORS.CHARTS.LINE[
                          series[index].name.split(
                            ' '
                          )[0] as keyof typeof COLORS.CHARTS.LINE
                        ],
                      style: {
                        color: '#fff',
                        background:
                          COLORS.CHARTS.LINE[
                            series[index].name.split(
                              ' '
                            )[0] as keyof typeof COLORS.CHARTS.LINE
                          ],
                      },
                      text: series[index].name,
                    },
                    marker: {
                      size: 8,
                      fillColor:
                        COLORS.CHARTS.LINE[
                          series[index].name.split(
                            ' '
                          )[0] as keyof typeof COLORS.CHARTS.LINE
                        ],
                      strokeColor: '#fff',
                      radius: 2,
                    },
                  };
                }
              }),
            },
          }}
          series={[{ data: series.map((item) => Number(item.data)) }]}
          height={400}
          width={series.length > 10 ? '99%' : '95%'}
          data-testid="line-chart-component"
        />
        {isDaily && (
          <div
            className="d-flex justify-content-between align-items-center mb-3 py-2 date-legend-graph-line"
            style={{
              color: '#fff',
              paddingLeft: '7vw',
              paddingRight: '1vw',
              marginTop: '-2.5vh',
              backgroundColor: '#242632',
            }}
            data-testid="line-chart-time"
          >
            <small>
              {DateHelper.formatTimestampInDays(
                categories[0],
                store.auth.userInfo?.timeZone
              )}
            </small>
            <small>
              {DateHelper.formatTimestampInDays(
                categories[categories.length - 1],
                store.auth.userInfo?.timeZone
              )}
            </small>
          </div>
        )}
      </div>
    ) : (
      <div
        className="d-flex justify-content-center align-items-center p-4 m-4"
        data-testid="error-message-linechart"
      >
        <Text
          text={
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL
              .thereIsNoData
          }
        />
      </div>
    );
  }
);
