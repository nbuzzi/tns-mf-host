import React from "react";
import { Table } from "react-bootstrap";
import { DeviceMember } from "../../../../interfaces/memberConnectivity/memberConnectivity";

interface Props {
  devices?: DeviceMember[];
}

export const ItemSrcTnsDevice: React.FC<Props> = ({ devices }) => {
  return (
    <Table data-testid="memberSrc-device-table">
      <tbody>
        <tr>
          <td className="p-0 text-center">
            {devices?.map((device, deviceIndex) => (
              <div key={deviceIndex} className="grid-src">
                <div className="mx-10">{device.srcTnsDeviceName}</div>
                <div>{device.srcCustomerDeviceName}</div>
              </div>
            ))}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
