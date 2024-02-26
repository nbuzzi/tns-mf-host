import React, { MouseEvent, useCallback, useMemo } from "react";
import { useEffect } from "react";
import { Button, Navbar, NavDropdown } from "react-bootstrap";
import { ProfileDD } from "./user/Dropdown";
import { LanguageSelector } from "../../components/shared/language/LanguageSelector";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRightFromBracket, faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../store/StoreMobx";
import { observer } from "mobx-react";
import { Alert } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { TRANSLATION } from "../../utils/const/translation";

const Header: React.FC = () => {
  const toggleMiniSidebar = store.customizer.isMiniSidebar;
  const { t } = useTranslation();
  const { currentLanguage } = store.shared;
  const isActAs = localStorage.getItem("actAs");
  const navigate = useNavigate();
  const stylesAlert = useMemo(() => {
    return {
      margin: "auto",
      fontFamily: "Helvetica",
      marginLeft: toggleMiniSidebar ? "4.5vw" : "11vw",
    };
  }, [toggleMiniSidebar]);

  const handleSideBar = useCallback(
    (event: MouseEvent<HTMLElement | undefined>): void => {
      if (toggleMiniSidebar) {
        store.customizer.ToggleMiniSidebar();
        store.customizer.ToggleMobileSidebar();
      } else {
        store.customizer.ToggleMobileSidebar();
      }
      event?.preventDefault();
    },
    [toggleMiniSidebar]
  );

  const handleActAs = useCallback((): void => {
    store.auth.stopActAs();
  }, []);

  const handleOnClick = useCallback((): void => {
    store.auth.logout();
  }, []);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage).catch((error) => {
      console.error("Error changing language:", error);
    });
  }, [currentLanguage]);

  return (
    <>
      {isActAs && (
        <Alert
          message={
            <div className="d-flex justify-content-between align-items-center alert-text">
              <span>
                {t(TRANSLATION.MODAL.ALERT.youAreImpersonatedAs)}: {store.auth.userInfo?.username}
              </span>
              <Button variant="warning" size="sm" onClick={handleActAs}>
                {t(TRANSLATION.MODAL.ALERT.stopActAs)}
              </Button>
            </div>
          }
          type="warning"
          showIcon
          style={stylesAlert}
          className="alert-tns"
        />
      )}
      <Navbar expand="sm" className="topbar d-flex justify-content-between">
        <div className="d-flex align-items-center gap-1">
          {/** ****************************/}
          {/* show only in mobile version */}
          <Button className="icon-list-mobile" onClick={goBack} size="sm">
            <FontAwesomeIcon icon={faArrowLeft} size="sm" />
          </Button>
          <Button className="icon-back-mobile" onClick={handleSideBar} size="sm">
            <FontAwesomeIcon icon={faBars} size="sm" className="cursor-pointer" />
          </Button>
        </div>
        <div className="d-flex align-items-center nav-container">
          {/** ******Language*******/}
          <Button className="language-mobile d-flex d-md-none" size="sm">
            <LanguageSelector />
          </Button>
          {/** ****************************/}
          <div className="d-none d-md-flex align-items-center gap-1">
            {/* language selection option remains disabled for version V3 */}
            <LanguageSelector />
          </div>
          <div className="d-flex align-items-center nav-container gap-3">
            {/** ******profile*******/}
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={<FontAwesomeIcon icon={faUserCircle} className="navDropdown" size="10x" />}
              className="d-none d-md-flex nav-dropdown-header mr-auto"
              align={"end"}>
              <ProfileDD />
            </NavDropdown>
            <Button className="d-none p-0 d-md-flex btn btn-link bg-transparent border-none" onClick={handleOnClick} data-cy="button-logout">
              <FontAwesomeIcon icon={faArrowRightFromBracket} color="white" />
            </Button>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default observer(Header);
