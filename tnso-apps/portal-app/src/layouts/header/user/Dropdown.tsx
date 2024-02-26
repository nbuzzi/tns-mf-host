import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import { User } from "react-feather";
import { Dropdown } from "react-bootstrap";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { store } from "../../../store/StoreMobx";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { SWITCH_ENABLE } from "../../../config/environments";
import { TRANSLATION } from "../../../utils/const/translation";

export const ProfileDD: React.FC = observer(() => {
  const isDarkMode = store.customizer.isDark;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRedirectProfile = useCallback(async () => {
    await store.shared.setOpenKeys([]);
    await store.shared.setMenuItemSelected();
    navigate("/user/profile");
  }, [navigate]);

  const [themeSelected, setThemeSelected] = useState(`${t(TRANSLATION.PROFILE.THEME.dark)}`);

  const handleThemeChange = useCallback(
    (checked: boolean, event: MouseEvent<HTMLButtonElement>): void => {
      if (checked) {
        // eslint-disable-next-line
        setThemeSelected(`${t(TRANSLATION.PROFILE.THEME.light)}`);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        store.customizer.ChangeDarkMode(checked);
        window.location.reload();
      } else {
        store.customizer.ChangeDarkMode(checked);
        setThemeSelected(`${t(TRANSLATION.PROFILE.THEME.dark)}`);
      }
      event.preventDefault();
    },
    [t]
  );

  useEffect(() => {
    setThemeSelected(isDarkMode ? `${t(TRANSLATION.PROFILE.THEME.dark)}` : `${t(TRANSLATION.PROFILE.THEME.light)}`);
  }, [isDarkMode, t]);

  return (
    <div className="user-menu">
      <div className="d-flex gap-3 p-3 text-white rounded-top bg-primary-tns pt-2 align-items-center">
        <div className="icon-user">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <span>
          {store.auth.userInfo?.username && <h5 className="profile-info">{store.auth.userInfo?.username}</h5>}
          {store.auth.userInfo?.email && <small className="profile-info">{store.auth.userInfo.email}</small>}
        </span>
      </div>
      {SWITCH_ENABLE && (
        <Dropdown.Item className="px-4 py-3 d-flex flex-column">
          <span>{themeSelected}</span>
          <Switch defaultChecked onChange={handleThemeChange} className="w-25" data-testid="theme-switch" />
        </Dropdown.Item>
      )}
      <Dropdown.Item onClick={handleRedirectProfile} className="px-4 py-3" data-cy="dropdown-my-profile" role="my-profile" data-testid="dropdown-my-profile">
        <User size={20} />
        {/* eslint-disable-next-line */}
        <span data-cy="dropdown-my-profile" className="my-profile">
          &nbsp; {t(TRANSLATION.PROFILE.myProfile)}
        </span>
      </Dropdown.Item>
    </div>
  );
});
