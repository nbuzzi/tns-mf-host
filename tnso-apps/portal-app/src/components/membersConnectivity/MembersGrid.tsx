import React from "react";
import { Col, Row } from "react-bootstrap";
import { ComponentStatus } from "../shared/table/memberProperties/MemberConnectivityStatus";
import { MembersTable } from "../shared/table/memberProperties/MembersTable";
import { MembersResponse } from "../../interfaces/memberConnectivity/memberConnectivity";
import { ComponentKnownAs } from "../shared/table/memberProperties/MemberKnownAs";

interface MembersGridProps {
  membersData?: MembersResponse;
}

export const MembersGrid: React.FC<MembersGridProps> = ({ membersData }) => {
  return (
    <div className="container-grid d-flex flex-column gap-4 mt-3" data-testid="members-grid-component">
      {membersData?.members.map((member) => (
        <div key={member.acna}>
          <Row className="w-100">
            <Col md={3}>
              <ComponentKnownAs acna={member.acna} knownAs={member.knownAs} />
            </Col>
            <Col md="auto">
              <ComponentStatus status={member.memberConnectivityStatus} />
            </Col>
          </Row>
          <MembersTable devices={member.devices} />
        </div>
      ))}
    </div>
  );
};
