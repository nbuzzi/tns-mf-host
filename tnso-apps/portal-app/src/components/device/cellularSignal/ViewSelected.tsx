import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { Views } from '../../../views/menu/monitoring/devices/device-detail/tabs/CellularSignal';
import { TRANSLATION } from '../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

interface Props {
  viewSelected: string;
  handleItemSelect: (value: Views) => void;
}

export const ViewSelected: React.FC<Props> = observer(
  ({ viewSelected, handleItemSelect }) => {
    return (
      <Dropdown
        title="Options"
        id="dropdown-menu"
        data-testid="dropdown-menu-component"
      >
        <Dropdown.Toggle
          variant="primary"
          id="dropdown-month"
          className="btn-dropdown"
        >
          {viewSelected}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            key={Views.DefaultView}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={(): void => handleItemSelect(Views.DefaultView)}
          >
            <Text
              text={
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                  .SWITCHBUTTONVIEW[
                  Views.DefaultView as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD.SWITCHBUTTONVIEW
                ]
              }
            />
          </Dropdown.Item>
          <Dropdown.Item
            key={Views.LegacyView}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={(): void => handleItemSelect(Views.LegacyView)}
          >
            <Text
              text={
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                  .SWITCHBUTTONVIEW[
                  Views.LegacyView as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD.SWITCHBUTTONVIEW
                ]
              }
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
);
