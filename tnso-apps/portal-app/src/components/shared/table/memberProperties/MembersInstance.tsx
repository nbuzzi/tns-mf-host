import React from "react";
import { Table } from "react-bootstrap";
import { DeviceMember } from "../../../../interfaces/memberConnectivity/memberConnectivity";

interface Props {
  devices?: DeviceMember[];
}

export const ItemsInstance: React.FC<Props> = ({ devices }) => {
  return (
    <Table className="column-table" data-testid="member-instance-table">
      <tbody>
        <tr>
          <td className="text-center p-0">
            {devices?.map((device, deviceIndex) => (
              <div key={deviceIndex}>
                {device.interfaceDetails.map((interfaceDetail, interfaceIndex) => (
                  <div key={interfaceIndex}>
                    <div key={interfaceIndex} className="text-center grid-tunnel">
                      {interfaceDetail.interfaceType}
                    </div>
                    <div key={interfaceIndex} className="text-center grid-tunnel">
                      {interfaceDetail.interfaceType}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
