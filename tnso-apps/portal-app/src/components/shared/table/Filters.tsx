import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { TRANSLATION } from "../../../utils/const/translation";
import i18n from 'i18n-module/i18n';

interface FiltersProps {
  handleDevices?: () => void;
}

export const Filters: React.FC<FiltersProps> = ({ handleDevices }) => {
  return (
    <div className="col-auto" data-testid="filters-button">
      <Button variant="outline-primary" className="px-2 mx-1" size="sm" onClick={handleDevices} title={i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.resetFilters)}>
        <FontAwesomeIcon icon={faFilterCircleXmark} />
      </Button>
    </div>
  );
};
