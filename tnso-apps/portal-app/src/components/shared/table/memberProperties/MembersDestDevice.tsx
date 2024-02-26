import React from "react";
import { Table } from "react-bootstrap";
import { DeviceMember } from "../../../../interfaces/memberConnectivity/memberConnectivity";

interface Props {
  devices?: DeviceMember[];
}

export const ItemsDestTnsDevice: React.FC<Props> = ({ devices }) => {
  return (
    <Table className="column-table" data-testid="member-destdevice-table">
      <tbody>
        <tr>
          <td className="p-0">
            {devices?.map((device, deviceIndex) => (
              <div key={deviceIndex} className="text-center grid-dest">
                <div>{device.destTnsDeviceName}</div>
                <div>{device.destCustomerDeviceName}</div>
              </div>
            ))}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
