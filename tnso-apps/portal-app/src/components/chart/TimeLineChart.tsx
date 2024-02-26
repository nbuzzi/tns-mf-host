import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { observer } from "mobx-react";
import { ScheduleGraphStatus } from "../../interfaces/changeTickets/changeTickets";
import { COLORS } from "../../utils/const/colors";

interface ChartsProps {
  series: ApexOptions["series"];
}

export const TimeLineChart: React.FC<ChartsProps> = observer(({ series }) => {
  return (
    <ReactApexChart
      type="rangeBar"
      options={{
        tooltip: {
          cssClass: "tooltip-custom",
          enabled: true
        },
        chart: {
          toolbar: {
            show: false
          },
          height: 350,
          type: "rangeBar"
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "80%"
          }
        },
        legend: {
          position: "top",
          fontFamily: "Helvetica",
          labels: {
            colors: Object.values(COLORS.CHARTS.TIMELINE)
          },
          customLegendItems: Object.values(ScheduleGraphStatus),
          markers: {
            fillColors: Object.values(COLORS.CHARTS.TIMELINE)
          }
        },
        dataLabels: {
          enabled: false,
          formatter: (value: number[]): string => {
            const date = new Date(value[0]);
            const day = date.getDate();
            const month = date.toLocaleString("default", { month: "short" });
            const year = date.getFullYear().toString().slice(-2); // Obtener los últimos dos dígitos del año
            return `${day} ${month} '${year}`;
          }
        },
        colors: [Object.values(COLORS.CHARTS.TIMELINE)],
        xaxis: {
          range: 100,
          labels: {
            style: {
              colors: ["#FFFFFF"],
              fontFamily: "Helvetica"
            },
            // rotateAlways: true,
            rotate: 0,
            formatter: function (value): string {
              const date = new Date(value);
              const year = date.getFullYear().toString().slice(-2); // Obtener los últimos dos dígitos del año
              const month = date.toLocaleString("default", { month: "short" });
              const day = date.getDate();
              return `${day} ${month} '${year}`;
            }
          },
          type: "datetime"
        },
        yaxis: {
          labels: {
            show: false
          },
          show: true
        }
      }}
      series={series}
      height={450}
      data-testid="timeline-chart-component"
    />
  );
});
