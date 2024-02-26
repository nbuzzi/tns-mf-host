import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthHelper } from "../interfaces/auth-helper";
import { Roles } from "../interfaces/role-and-permission/role";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withAuthorization = (WrapedComponent: any, roles: Roles[]): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WithAuthorization = (props: any): JSX.Element => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const { role } = AuthHelper.getAuthByToken(token);

    useEffect(() => {
      if (!roles.includes(role)) {
        navigate("/auth/403", { replace: true });
      }
    }, [navigate, role]);

    return <WrapedComponent {...props} />;
  };

  return WithAuthorization;
};

export default withAuthorization;
