import { faDownload, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";

export const ChartButtons = (): JSX.Element => {
  return (
    // hide component while functionality is not implemented
    <div className="d-none d-flex gap-2 chart-button" data-testid="chart-button">
      <Button variant="primary" className="btn-chart-more" size="sm" data-testid="chart-plus-button">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Button variant="primary" className="btn-chart-download" size="sm" data-testid="chart-download-button">
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    </div>
  );
};
