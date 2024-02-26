import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useScreenSize } from "../../hooks/useScreenSize";
import { COLORS } from "../../utils/const/colors";
import { Period } from "../../interfaces/devices/cellular/cellularSignal";
import { store } from "../../store/StoreMobx";
import { observer } from "mobx-react";
import { DateHelper } from "../../helpers/shared/DateHelper";

export interface ChartsProps {
  series: ApexOptions["series"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any;
  interval: Period;
}

export const ScatterChart: React.FC<ChartsProps> = observer(({ series, categories, interval }) => {
  const isDarkMode = store.customizer.isDark;
  const { isMobile, isTablet } = useScreenSize();
  const isDaily = interval === Period.Daily;

  return (
    <div>
      <ReactApexChart
        type="scatter"
        options={{
          tooltip: {
            cssClass: "tooltip-custom"
          },
          chart: {
            toolbar: {
              show: false
            },
            height: 350,
            animations: {
              enabled: false
            },
            background: "#131b32"
          },
          dataLabels: {
            enabled: false
          },
          grid: {
            borderColor: isDarkMode ? COLORS.CHARTS.LINE.GRAY : COLORS.CHARTS.LINE.DARK_GRAY,
            xaxis: {
              lines: {
                show: true
              }
            },
            yaxis: {
              lines: {
                show: true
              }
            }
          },
          colors: [COLORS.SCATTER.BLUE, COLORS.SCATTER.GREEN],
          xaxis: {
            categories: categories.map((item: number): string => {
              const date = isDaily ? DateHelper.formatTimestampInHours(item, store.auth.userInfo?.timeZone) : DateHelper.formatTimestampInDays(item, store.auth.userInfo?.timeZone);
              return date;
            })
          },
          yaxis: {
            min: 0,
            max: 100,
            tickAmount: 10
          },
          markers: {
            size: isMobile ? 5 : isTablet ? 6 : 7
          }
        }}
        series={series}
        height={400}
        width={isMobile ? "100%" : isTablet ? "100%" : "100%"}
        data-testid="scatter-chart-component"
      />
      {interval === Period.Daily && (
        <div
          className="d-flex justify-content-between align-items-center mb-3 py-2 w-100"
          style={{ color: "#fff", paddingLeft: "1vw", paddingRight: "1vw", marginTop: "-2.5vh", backgroundColor: "#242632" }}
          data-testid="scatter-chart-time">
          <small>{DateHelper.formatTimestampInDays(categories[0], store.auth.userInfo?.timeZone)}</small>
          <small>{DateHelper.formatTimestampInDays(categories[categories.length - 1], store.auth.userInfo?.timeZone)}</small>
        </div>
      )}
    </div>
  );
});
