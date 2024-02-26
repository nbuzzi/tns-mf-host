import React from "react";
import { Table } from "react-bootstrap";
import { COLORS } from "../../../../utils/const/colors";
import { DeviceMember } from "../../../../interfaces/memberConnectivity/memberConnectivity";

interface Props {
  devices?: DeviceMember[];
}

export const ItemsTunnelStatus: React.FC<Props> = ({ devices }) => {
  const getStatusColor = (status: string): string => {
    return COLORS.TABLE.INTERFACESTATUS[status as keyof typeof COLORS.TABLE.INTERFACESTATUS];
  };

  return (
    <Table className="column-table">
      <tbody>
        <tr>
          <td className="text-center p-0">
            {devices?.map((device, deviceIndex) => (
              <div key={deviceIndex}>
                {device.interfaceDetails.map((interfaceDetail, interfaceIndex) => (
                  <div key={interfaceIndex}>
                    <div
                      className="text-center grid-tunnel"
                      style={{
                        color: getStatusColor(interfaceDetail.interfaceStatus)
                      }}>
                      {interfaceDetail.interfaceStatus}
                    </div>
                    <div
                      className="text-center grid-tunnel"
                      style={{
                        color: getStatusColor(interfaceDetail.interfaceStatus)
                      }}>
                      {interfaceDetail.interfaceStatus}
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
