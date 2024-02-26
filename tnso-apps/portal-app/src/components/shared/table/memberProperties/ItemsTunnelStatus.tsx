import React from "react";
import { Col } from "react-bootstrap";
import { COLORS } from "../../../../utils/const/colors";
import { InterfaceDetails, InterfaceStatus } from "../../../../interfaces/memberConnectivity/memberConnectivity";
import { interfaceStatusTranslation } from "../../../../interfaces/memberConnectivity/memberConnectivity";

interface Props {
  interfaceDetails?: InterfaceDetails[];
}

export const ItemsTunnelStatus: React.FC<Props> = ({ interfaceDetails }) => {
  const getStatusColor = (status: InterfaceStatus): string => {
    return COLORS.TABLE.INTERFACESTATUS[status as keyof typeof COLORS.TABLE.INTERFACESTATUS];
  };

  return (
    <td className="col-2 border-1 p-0" data-testid="items-tunnel-status">
      {interfaceDetails?.map((item, index) => (
        <Col
          md={12}
          key={index}
          className="text-center py-2"
          style={{
            borderBottom: `${interfaceDetails.length > 1 && index < interfaceDetails.length - 1 ? "1px solid #CCCCCC" : "0px"}`,
            ...(interfaceDetails.length <= 1 || index === interfaceDetails.length - 1 ? { marginTop: "0.3rem" } : {}),
            color: getStatusColor(item.interfaceStatus)
          }}>
          {interfaceStatusTranslation(item.interfaceStatus)}
        </Col>
      ))}
    </td>
  );
};
