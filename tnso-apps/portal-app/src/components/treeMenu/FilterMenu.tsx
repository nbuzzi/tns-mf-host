/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { GroupService } from "../../service/device/GroupService";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../utils/const/colors";
import { Checkbox } from "antd";
import { GroupFilters } from "../../interfaces/devices/group/group";
import { observer } from "mobx-react";
import { store } from "../../store/StoreMobx";
import { TRANSLATION } from "../../utils/const/translation";
import i18n from 'i18n-module/i18n';


export const FilterMenu: React.FC = observer(() => {
  const { t } = useTranslation();
  const { group } = store;
  const [valueChecked, setValueChecked] = useState<string>("member");

  const handleFilter = useCallback(
    async (filter: string | null) => {
      const filterData = filter;
      group.cleanTreeDataGroups();
      if (filter) {
        let params: string | undefined;
        const filterParams = filter.split(" ");
        if (filterParams.length > 2) {
          filterParams.pop();
          params = filterParams.join("");
        } else {
          params = filter.replace(" ", "");
        }
        const groups = await GroupService.getAll({ [params]: params });
        if (groups && groups.data) {
          group.setGroups(groups.data);
          group.setIsActiveGroup(filterData === GroupFilters.Member ? false : true);
          group.setGroupsFilterBy(filterData ?? GroupFilters.Member);
        }
      }
    },
    [group.setGroups, group.setIsActiveGroup, group.setGroupsFilterBy, group.cleanTreeDataGroups]
  );

  const filters = useMemo(
    () => (
      <div className="drop-down-filter">
        <Dropdown.Menu>
          {Object.values(GroupFilters).map((item) => {
            return (
              <Dropdown.Item eventKey={item} key={item} onClick={(): void => setValueChecked(item)}>
                <Checkbox checked={item === valueChecked} />
                {`${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.groupBy)} + ${i18n.t(
                  TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.FILTER[item as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.FILTER]
                )[0].toUpperCase()} + ${i18n.t(
                  TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.FILTER[item as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.FILTER]
                )}`.slice(1)}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </div>
    ),
    [t, valueChecked]
  );

  return (
    <Dropdown onSelect={handleFilter} className="containerFilter" data-testid="filter-menu-component">
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" size="sm">
        <FontAwesomeIcon icon={faEllipsisVertical} color={COLORS.MENU.FILTER.TEXT} />
      </Dropdown.Toggle>
      {filters}
    </Dropdown>
  );
});
