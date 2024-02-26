import React from "react";

import { store } from "../../store/StoreMobx";
import { observer } from "mobx-react";

import { ReactComponent as LogoDarkIcon } from "../../assets/images/logos/dark-logo-icon.svg";
import { ReactComponent as LogoDarkText } from "../../assets/images/logos/dark-logo-text.svg";
import { ReactComponent as LogoWhiteIcon } from "../../assets/images/logos/white-logo-icon.svg";
import { ReactComponent as LogoWhiteText } from "../../assets/images/logos/white-logo-text.svg";

const AuthLogo: React.FC = () => {
  const isDarkMode = store.customizer.isDark;

  return (
    <div className="p-4 d-flex align-items-center justify-content-center gap-2">
      {isDarkMode !== false ? (
        <>
          <LogoWhiteIcon />
          <LogoWhiteText />
        </>
      ) : (
        <>
          <LogoDarkIcon />
          <LogoDarkText />
        </>
      )}
    </div>
  );
};
export default observer(AuthLogo);
