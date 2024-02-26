import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { COLORS } from "../../utils/const/colors";
import { DevicesConnectionStatus } from "../../interfaces/devices/group/group";
import { TreeMenuHelper } from "../../helpers/treeMenu/TreeMenuHelper";

export interface ItemDoughnutChartProps {
  devicesStatus?: DevicesConnectionStatus;
}

export interface StatusToPercentage {
  onPrimary: number;
  onBackup: number;
}

export const ItemDoughnutChart: React.FC<ItemDoughnutChartProps> = ({ devicesStatus }): JSX.Element => {
  const [maxPercentage, setMaxPercentage] = useState<number>(0);
  const [connectionStatus, setConnectionStatus] = useState<DevicesConnectionStatus>();

  const statusColor = COLORS.DEVICES.STATUS;

  useEffect(() => {
    if (devicesStatus) {
      TreeMenuHelper.getDonutMaxPercentage(devicesStatus.onPrimary, devicesStatus.onBackup, setMaxPercentage, setConnectionStatus, devicesStatus);
    }
  }, [devicesStatus, setMaxPercentage, setConnectionStatus]);

  return (
    <div className="item-doughnut-container" data-testid="doughnut-chart-component">
      {connectionStatus && (
        <>
          <span className="max-percentage-label">{maxPercentage}%</span>
          <ReactApexChart
            type="donut"
            series={[connectionStatus.onPrimary, connectionStatus.onBackup, connectionStatus.offline, connectionStatus.indeterminate, connectionStatus.unknown]}
            options={{
              stroke: {
                show: false
              },
              chart: {
                type: "donut",
                sparkline: {
                  enabled: true
                }
              },
              colors: [statusColor.ONPRIMARY, statusColor.ONBACKUP, statusColor.OFFLINE, statusColor.INDETERMINATE, statusColor.UNKNOWN],
              legend: {
                show: false
              },
              dataLabels: {
                enabled: false
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: "85%"
                  },
                  offsetY: -1,
                  customScale: 0.95
                }
              }
            }}
            width="35px"
            height="40px"
            data-testid="doughnut-apex-chart"
          />
        </>
      )}
    </div>
  );
};
