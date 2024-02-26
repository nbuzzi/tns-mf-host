import React from "react";
import { Col } from "react-bootstrap";
import { InterfaceDetails } from "../../../../interfaces/memberConnectivity/memberConnectivity";
import { interfaceType } from "../../../../interfaces/memberConnectivity/memberConnectivity";

interface Props {
  interfaceDetails?: InterfaceDetails[];
}

export const ItemsInstance: React.FC<Props> = ({ interfaceDetails }) => {
  return (
    <td className="col-2 border-1 p-0" data-testid="item-instance">
      {interfaceDetails?.map((item, index) => (
        <Col
          key={index}
          className="text-center border-1 py-2"
          style={{
            borderBottom: `${interfaceDetails.length > 1 && index < interfaceDetails.length - 1 ? "1px solid #CCCCCC" : "0px"}`,
            ...(interfaceDetails.length <= 1 || index === interfaceDetails.length - 1 ? { marginTop: "0.3rem" } : {})
          }}>
          {interfaceType(item.interfaceType)}
        </Col>
      ))}
    </td>
  );
};
