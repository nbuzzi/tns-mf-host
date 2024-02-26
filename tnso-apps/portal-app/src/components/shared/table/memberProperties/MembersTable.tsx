import React from "react";
import { Table } from "react-bootstrap";
import { DeviceMember, MembersTableTitle } from "../../../../interfaces/memberConnectivity/memberConnectivity";
import { ItemsTunnelStatus } from "./ItemsTunnelStatus";
import { ItemsInstance } from "./ItemsInstance";
import { ItemsSrcAndDest } from "./ItemsSrcAndDest";
import { membersTableTitlesTranslation } from "../../../../../src/interfaces/memberConnectivity/memberConnectivity";

interface Props {
  devices?: DeviceMember[];
}

export const MembersTable: React.FC<Props> = ({ devices }) => {
  const enumValues = Object.values(MembersTableTitle);
  return (
    <Table size="sm" responsive>
      <thead>
        <tr>
          {enumValues.map((item, index) => (
            <th
              key={index}
              className="text-center py-2"
              style={{
                backgroundColor: "#CCCCCC",
                color: "#505050"
              }}>
              {membersTableTitlesTranslation(item)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {devices?.map((item, index) => (
          <tr key={index}>
            <ItemsSrcAndDest item={item} />
            <ItemsInstance interfaceDetails={item.interfaceDetails} />
            <ItemsTunnelStatus interfaceDetails={item.interfaceDetails} />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
