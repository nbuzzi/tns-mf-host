import React from "react";
import { useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { COLORS } from "../../utils/const/colors";

interface Props {
  dataLeyend: {
    statusesConnection: StatusConnection[];
    membersConnection: StatusConnection[];
  };
}

interface StatusConnection {
  status: string;
  color: string;
}

export const GraphLeyends: React.FC<Props> = ({ dataLeyend }) => {
  const statusComponent = useCallback((statusesConnection: StatusConnection, key: string) => {
    return (
      <Row key={key} data-testid="graph-leyends-component">
        <Col
          md={1}
          className="box-status m-auto"
          style={{
            borderTop: `2px ${statusesConnection.color === COLORS.MEMBERS.STATUS.down ? "dashed" : "solid"} ${statusesConnection.color}`
          }}
        />
        <Col className="text-status d-flex gap-2">
          <strong className="text-center" style={{ color: `${statusesConnection.color}` }}>
            {statusesConnection.status.split("|")[0]}
          </strong>
          {statusesConnection.status.split("|")[1]}
        </Col>
      </Row>
    );
  }, []);

  const memberComponent = useCallback((statusesConnection: StatusConnection, key: string) => {
    return (
      <Row key={key}>
        <Col md={1} className="m-auto">
          <div className="circle-status" style={{ backgroundColor: `${statusesConnection.color}` }} />{" "}
        </Col>
        <Col className="text-status">{statusesConnection.status}</Col>
      </Row>
    );
  }, []);

  return (
    <div className="leyend-container-members">
      <div className="status-connection px-4 py-2">
        {dataLeyend.statusesConnection.map((statusConnection, index) => {
          return statusComponent(statusConnection, `${statusConnection.status}-${index}`);
        })}
      </div>
      <div className="member-connection px-4 py-2">
        {dataLeyend.membersConnection.map((statusConnection, index) => {
          return memberComponent(statusConnection, `${statusConnection.status}-${index}`);
        })}
      </div>
    </div>
  );
};
