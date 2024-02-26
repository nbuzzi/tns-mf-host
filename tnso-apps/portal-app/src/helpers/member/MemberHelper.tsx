import React from "react";
import { createSchema } from "beautiful-react-diagrams";
import { DiagramSchema, NodeCoordinates } from "beautiful-react-diagrams/@types/DiagramSchema";
import { ConnectedMember, MemberConnectivityParams, MembersGraphResponse } from "../../interfaces/memberConnectivity/memberConnectivity";
import { COLORS } from "../../utils/const/colors";
import { CustomNode } from "../../components/membersConnectivity/CustomNode";
import { store } from "../../store/StoreMobx";
import { DeviceParams } from "../../interfaces/devices/devices";

interface NodeMember {
  id: string;
  content: string;
  coordinates: NodeCoordinates;
  // eslint-disable-next-line
  render?: (props: any) => React.ReactElement;
}

export interface BuilderParams {
  currentPage?: number;
  recordsPerPage?: number;
  tableFilters?: Record<string, string>;
}
export class MemberHelper {
  static createSchemaGraph = (memberGraph: MembersGraphResponse): DiagramSchema<unknown> => {
    const parentNode: NodeMember = {
      id: memberGraph.srcAcna,
      content: memberGraph.srcAcna,
      // eslint-disable-next-line
      render: (props: any) => (
        <CustomNode
          {...props}
          backgroundColor={COLORS.MEMBERS.NODE[memberGraph.srcAcnaStatus as keyof typeof COLORS.MEMBERS.NODE]}
          status={memberGraph.srcAcnaStatus}
          text={memberGraph.srcAcna}
          length={memberGraph.connectedMembers.length}
        />
      ),
      coordinates: [450, 280]
    };

    const radius = 250; // Nueva distancia del nodo restante al nodo padre

    const restNodes: NodeMember[] = memberGraph.connectedMembers.map((member: ConnectedMember, index) => {
      const angle = (2 * Math.PI * index) / memberGraph.connectedMembers.length; // Calcular el ángulo

      const x = parentNode.coordinates[0] + radius * Math.cos(angle); // Calcular la coordenada x
      const y = parentNode.coordinates[1] + radius * Math.sin(angle); // Calcular la coordenada y

      return {
        id: member.destAcna === memberGraph.srcAcna ? `${member.destAcna}-1` : member.destAcna,
        content: member.destAcna,
        draggable: false,
        // eslint-disable-next-line
        render: (props: any) => (
          <CustomNode
            {...props}
            backgroundColor={COLORS.MEMBERS.NODE[member.destAcnaStatus as keyof typeof COLORS.MEMBERS.NODE]}
            status={member.destAcnaStatus}
            text={member.destAcna}
            length={memberGraph.connectedMembers.length}
          />
        ),
        coordinates: [x, y]
      };
    });

    const connectedMember = memberGraph.connectedMembers ?? store.member.connectedMember;

    const schema = createSchema({
      nodes: [parentNode, ...restNodes],
      links: connectedMember.map((member: ConnectedMember) => ({
        readonly: true,
        input: memberGraph.srcAcna,
        output: member.destAcna === memberGraph.srcAcna ? `${member.destAcna}-1` : member.destAcna,
        className: `link-${member.memberConnectivityStatus}`
      }))
    });
    return schema;
  };

  static modifyStatus(text: string): string {
    const words = text.split(/[\s-]/);
    const modifiedWords = words.map((word, index) => (index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()));
    return modifiedWords.join("");
  }

  static builderMembersExportQueryParams({ tableFilters, currentPage, recordsPerPage = 10 }: BuilderParams = {}): MemberConnectivityParams {
    let queryParams: DeviceParams = {};
    const prevParams = localStorage.getItem("membersConnectivityParams");

    const startAtRecord = (currentPage || 0) * 10;
    queryParams = { ...queryParams, startAtRecord, recordsPerPage };

    if (tableFilters) {
      queryParams = { ...queryParams, ...tableFilters };
    }

    if (prevParams) {
      const newParams = { ...JSON.parse(prevParams), ...queryParams };
      localStorage.setItem("membersConnectivityParams", JSON.stringify(newParams));
      return newParams;
    }

    localStorage.setItem("membersConnectivityParams", JSON.stringify(queryParams));
    return queryParams;
  }
}
