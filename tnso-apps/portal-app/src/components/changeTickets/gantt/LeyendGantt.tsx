import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './GanttChart.scss';
import { TRANSLATION } from '../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

export const LeyendGantt: React.FC = () => {

  return (
    <div className="leyend-component" data-testid="leyend-gantt-component">
      <Row>
        <h6>
          <Text
            text={TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT.statusOfChange}
          />
        </h6>
      </Row>
      <Row>
        <Col md="auto" className="d-flex align-items-center gap-1 mx-2">
          <div className="status-box approved" />
          <span>
            <Text text={TRANSLATION.SHARED.DATATABLE.approved} />
          </span>
        </Col>
        <Col md="auto" className="d-flex align-items-center gap-1 mx-2">
          <div className="status-box cancelled" />
          <span>
            <Text text={TRANSLATION.SHARED.DATATABLE.Cancelled} />
          </span>
        </Col>
        <Col md="auto" className="d-flex align-items-center gap-1 mx-2">
          <div className="status-box in-progress" />
          <span>
            <Text text={TRANSLATION.SHARED.DATATABLE.InProgress} />
          </span>
        </Col>
        <Col md="auto" className="d-flex align-items-center gap-1 mx-2">
          <div className="status-box completed" />
          <span>
            <Text text={TRANSLATION.SHARED.DATATABLE.Completed} />
          </span>
        </Col>
        <Col md="auto" className="d-flex align-items-center gap-1 mx-2">
          <div className="status-box requested" />
          <span>
            <Text text={TRANSLATION.SHARED.DATATABLE.Requested} />
          </span>
        </Col>
      </Row>
    </div>
  );
};
