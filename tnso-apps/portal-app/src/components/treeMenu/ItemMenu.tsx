import React from "react";
import { Group } from "../../interfaces/devices/group/group";
import { ItemDoughnutChart } from "./ItemDoughnutChart";

export interface ItemMenuProp {
  id?: string;
  label?: string;
  group?: Group;
  devicesAmount?: number;
}

export const ItemMenu = ({ label, devicesAmount, id, group }: ItemMenuProp): JSX.Element => {
  const amount = devicesAmount ? `(${devicesAmount})` : "";

  return (
    <div className="d-flex justify-content-center align-items-center gap-2" accessKey={id} data-testid="doughnut-chart-menu">
      <div className="container-item d-flex align-items-center justify-content-between" accessKey={id}>
        <div className="d-flex align-items-center justify-content-start" accessKey={id}>
          <ItemDoughnutChart devicesStatus={group?.connectivityStatus} />
          <strong className="m-2 item-label" accessKey={id}>{`${label} ${amount}`}</strong>
        </div>
      </div>
    </div>
  );
};
