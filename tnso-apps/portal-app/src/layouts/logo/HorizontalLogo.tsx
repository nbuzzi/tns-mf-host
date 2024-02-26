import React from "react";
import { Link } from "react-router-dom";

import { store } from "../../store/StoreMobx";
import { observer } from "mobx-react";

import { ReactComponent as LogoDarkIcon } from "../../assets/images/logos/dark-logo-icon.svg";
import { ReactComponent as LogoDarkText } from "../../assets/images/logos/dark-logo-text.svg";
import { ReactComponent as LogoWhiteIcon } from "../../assets/images/logos/white-logo-icon.svg";
import { ReactComponent as LogoWhiteText } from "../../assets/images/logos/white-logo-text.svg";

const HorizontalLogo: React.FC = () => {
  const isDarkMode = store.customizer.isDark;

  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {!isDarkMode ? (
        <>
          <LogoWhiteIcon />
          <LogoWhiteText className="d-none d-lg-block" />
        </>
      ) : (
        <>
          <LogoDarkIcon />
          <LogoDarkText className="d-none d-lg-block" />
        </>
      )}
    </Link>
  );
};
export default observer(HorizontalLogo);
