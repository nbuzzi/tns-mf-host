import React from "react";
import { DeviceMember } from "../../../../interfaces/memberConnectivity/memberConnectivity";

interface Props {
  item: DeviceMember;
}
export const ItemsSrcAndDest: React.FC<Props> = ({ item }) => {
  return (
    <>
      <td className="col-4 text-center align-middle border-1 py-2" data-testid="src-tns-device">
        {item.srcTnsDeviceName}
        <br />
        {item.srcCustomerDeviceName}
      </td>
      <td className="col-4 text-center align-middle border-1 py-2" data-testid="dest-tns-device">
        {item.destTnsDeviceName}
        <br />
        {item.destCustomerDeviceName}
      </td>
    </>
  );
};
