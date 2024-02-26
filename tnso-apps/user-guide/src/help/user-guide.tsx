import React from "react";
import { AuthHelper } from "../interfaces/auth-helper";
import withAuthorization from "../HOC/with-authorization";
import StrapiApp from "./user-guide/StrapiApp";

const UserGuideInternal: React.FC = () => {
  return (
    <div className="guide-container d-flex flex-column">
      <h5 className="title-user-guide">User Guide</h5>
      <div className="divider mb-4" />
      <div>
        <StrapiApp />
      </div>
    </div>
  );
};

const UserGuide = withAuthorization(UserGuideInternal, AuthHelper.getAllowedRolesForRoute("userGuide"));

export default UserGuide;
