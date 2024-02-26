import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../models/role.model';
import { Authorization } from '../permissions/routes-by-jwt';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withAuthorization = (WrapedComponent: any, roles: Roles[]): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WithAuthorization = (props: any): JSX.Element => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const authInfo = Authorization.getAuthByToken(token);

    useEffect(() => {
      if (authInfo?.role && !roles.includes(authInfo.role)) {
        navigate('/auth/403', { replace: true });
      }
    }, [navigate, authInfo?.role]);

    return <WrapedComponent {...props} />;
  };

  return WithAuthorization;
};

export default withAuthorization;
