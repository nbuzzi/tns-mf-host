import React, { useCallback, useEffect } from "react";
import "./MemberGraph.scss";
import { COLORS } from "../../utils/const/colors";
import { MembersGraphResponse } from "../../interfaces/memberConnectivity/memberConnectivity";
import { MemberHelper } from "../../helpers/member/MemberHelper";
import Diagram, { useSchema } from "beautiful-react-diagrams";
import { observer } from "mobx-react";
import { GraphLeyends } from "./GraphLeyends";
import { TRANSLATION } from "../../utils/const/translation";
import i18n from 'i18n-module/i18n';

interface Props {
  membersGraph: MembersGraphResponse;
}

enum StatusConnection {
  fulleSiteToSite = "fulleSiteToSite",
  siteToSite = "siteToSite",
  tnsNetwork = "tnsNetwork",
  down = "down"
}

enum MembersConnection {
  memberOnline = "memberOnline",
  memberOnBackup = "memberOnBackup",
  memberOffline = "memberOffline"
}
const translatedStatusConnection = (status: StatusConnection): string => {
  return i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.STATUSCONECTION[status]);
};
const translatedMembersConnection = (conection: MembersConnection): string => {
  return i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.CONECTION[conection]);
};

export const ConnectedGraph: React.FC<Props> = observer(({ membersGraph }) => {
  const [schema, { onChange }] = useSchema(MemberHelper.createSchemaGraph(membersGraph));

  const renderLeyends = useCallback(() => {
    return {
      statusesConnection: [
        {
          status: translatedStatusConnection(StatusConnection.fulleSiteToSite),
          color: COLORS.MEMBERS.STATUS.fullServiceSiteToSite
        },
        {
          status: translatedStatusConnection(StatusConnection.siteToSite),
          color: COLORS.MEMBERS.STATUS.siteToSite
        },
        {
          status: translatedStatusConnection(StatusConnection.tnsNetwork),
          color: COLORS.MEMBERS.STATUS.tnsNetwork
        },
        {
          status: translatedStatusConnection(StatusConnection.down),
          color: COLORS.MEMBERS.STATUS.down
        }
      ],
      membersConnection: [
        {
          status: translatedMembersConnection(MembersConnection.memberOnline),
          color: COLORS.MEMBERS.NODE.fullService
        },
        {
          status: translatedMembersConnection(MembersConnection.memberOnBackup),
          color: COLORS.MEMBERS.NODE.onBackup
        },
        {
          status: translatedMembersConnection(MembersConnection.memberOffline),
          color: COLORS.MEMBERS.NODE.offline
        }
      ]
    };
  }, []);

  useEffect(() => {
    const newSchema = MemberHelper.createSchemaGraph(membersGraph);
    if (newSchema !== schema) {
      onChange(newSchema);
    }
  }, [onChange, membersGraph]);

  return (
    <div className="container-graph" data-testid="connected-graph-component">
      <Diagram schema={schema} key={JSON.stringify(schema)} data-testid="connected-graph-diagrama" />
      <GraphLeyends dataLeyend={renderLeyends()} data-testid="connected-graph-leyend" />
    </div>
  );
});
