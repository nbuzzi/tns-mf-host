import React from "react";
import logo from "../../assets/images/tns/tns-logo.png";

export const Logo: React.FC = () => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 logo-tns">
      <div className="h-100" />
      <img className="image-tns" src={logo} alt="tns-online" />
    </div>
  );
};
