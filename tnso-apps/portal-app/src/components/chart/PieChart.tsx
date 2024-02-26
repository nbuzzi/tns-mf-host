import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { store } from '../../store/StoreMobx';
import { TRANSLATION } from '../../utils/const/translation';
import i18n from 'i18n-module/i18n';

interface Props {
  series?: number[];
}
export const PieChart: React.FC<Props> = observer(({ series = [0] }) => {
  useEffect(() => {
    const percent = store.device.cellularUsage.current?.percent;
    const valueElement = document.querySelector('.apexcharts-datalabel-value');

    if (valueElement) {
      if (percent && percent > 100) {
        valueElement.classList.remove('apexcharts-datalabel-value');
        valueElement.classList.add('value-data-consumed-overage');
      } else {
        valueElement.classList.remove('value-data-consumed-overage');
        valueElement.classList.add('apexcharts-datalabel-value');
      }
    }
  }, [store.device.cellularUsage.current?.percent]);

  return (
    <ReactApexChart
      series={series}
      options={{
        tooltip: {
          y: {
            formatter: function (value): string {
              return `${value.toFixed(2)} MB`;
            },
          },
        },
        chart: {
          type: 'donut',
        },
        dataLabels: {
          enabled: true,
          // eslint-disable-next-line
          formatter: (_: string | number | number[], opts?: any): string => {
            return opts.seriesIndex !== 1
              ? `${opts.w.config.labels[opts.seriesIndex]}`
              : '';
          },
        },
        legend: {
          show: false,
          position: 'bottom',
        },
        labels: ['TX', i18n.t(TRANSLATION.SHARED.TABLE.dataRemaining), 'RX'],
        stroke: {
          colors: ['transparent'],
        },
        colors: ['#2A588D', '#0F2342', '#5388D8'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                  color: '#FFFFFF',
                  label: i18n.t(
                    TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL
                      .CELLULARSIGNAL.percentConsumed
                  ),
                  fontFamily: 'Helvetica',
                  fontWeight: 400,
                  fontSize: '13px',
                  // eslint-disable-next-line
                  formatter: (val: any): string => {
                    return `${Math.round(
                      store.device.cellularUsage.current?.percent as number
                    )}%`;
                  },
                },
              },
            },
          },
        },
      }}
      type="donut"
      data-testid="pie-chart-component"
      width={'450'}
    />
  );
});
