import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { COLORS } from '../../utils/const/colors';
import { DateHelper } from '../../helpers/shared/DateHelper';
import { UnitConvertHelper } from '../../helpers/shared/UnitConvertHelper';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../utils/const/translation';
import i18n from 'i18n-module/i18n';

interface Props {
  data?: number[];
  statusData?: string[];
  categories?: string[];
}
export const BarChart: React.FC<Props> = ({
  data = [0],
  statusData = ['#2C579E'],
  categories,
}) => {
  const { t } = useTranslation();
  const colors = statusData.map(
    (value) => COLORS.BARS[value as keyof typeof COLORS.BARS]
  );

  useEffect(() => {
    const serieElement = document.querySelector('.tooltip-custom');
    if (serieElement) {
      if (serieElement.textContent?.includes('series-1')) {
        serieElement.textContent.replace('series-1', '');
      }
    }
  }, [data]);

  return (
    <ReactApexChart
      type="bar"
      series={[
        {
          data: data.map(
            (
              val: number,
              index
            ): { y: number; x: string; fillColor?: string } => ({
              y: Number(val.toFixed(2)),
              x: DateHelper.getDateFromTimestampWithTimeZone(
                Number(categories?.[index] ?? '0'),
                'UTC',
                'MM/DD'
              ),
              fillColor: colors[index],
            })
          ),
        },
      ]}
      options={{
        tooltip: {
          enabled: true,
          cssClass: 'tooltip-custom',
          y: {
            formatter: function (value): string {
              return `${UnitConvertHelper.convertBytesToMegaBytes(
                value
              ).toFixed(2)} ${i18n.t(
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                  .CELLULARSIGNAL.MB
              )}`;
            },
          },
        },
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false,
          },
          background: '#131b32',
        },
        colors: colors,
        grid: {
          borderColor: 'transparent',
          padding: {
            left: 10,
            right: 10,
          },
        },
        yaxis: {
          labels: {
            formatter: (val: number): string => {
              return `${
                Number.isInteger(val)
                  ? UnitConvertHelper.convertBytesToMegaBytes(val)
                  : UnitConvertHelper.convertBytesToMegaBytes(val).toFixed(2)
              } ${i18n.t(
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                  .CELLULARSIGNAL.MB
              )}`;
            },
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            columnWidth: '50%',
            horizontal: false,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: false,
          formatter: (val): string => {
            return Number(val).toFixed(2) + '%';
          },
          offsetY: -20,
        },
        stroke: {
          show: false,
          width: 1,
          colors: ['transparent'],
        },
        xaxis: {
          categories: categories?.map((val: string) => [
            DateHelper.getDateFromTimestampWithTimeZone(
              Number(val),
              'UTC',
              'MM/DD'
            ),
          ]),
          labels: {
            style: {
              colors: '#FEFEFE',
            },
          },
        },
        fill: {
          opacity: 5,
          colors: colors,
        },
      }}
      height="90%"
      width="100%"
      data-testid="bar-chart-component"
    />
  );
};
