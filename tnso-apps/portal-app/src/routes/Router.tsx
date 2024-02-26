import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Roles } from '../interfaces/auth/roleAndPermission/role';
import Loadable from '../layouts/loader/Loadable';
import { DeviceDetail } from '../views/menu/monitoring/devices/device-detail/DeviceDetail';

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
const Profile = Loadable(
  lazy(() => import('../layouts/header/user/profile/Profile'))
);
// Devices
const DevicesSection = Loadable(
  lazy(() => import('../views/menu/monitoring/devices/DevicesSection'))
);
const MembersSection = Loadable(
  lazy(() => import('../views/menu/monitoring/members/MembersConnectivity'))
);
// Administration
const CompanyProfileName = Loadable(
  lazy(
    () =>
      import(
        '../views/menu/administration/companyAdministration/CompanyProfile'
      )
  )
);
const UserProfile = Loadable(
  lazy(
    () => import('../views/menu/administration/userAdministration/UserProfile')
  )
);
const Administration = Loadable(
  lazy(
    () =>
      import(
        '../views/menu/administration/companyAdministration/Administration'
      )
  )
);
const AssociateCompanyProfiles = Loadable(
  lazy(
    () =>
      import(
        '../views/menu/administration/userAdministration/AssociateCompanyProfiles'
      )
  )
);
// Support
const ChangeSection = Loadable(
  lazy(() => import('../views/menu/support/changeManagement/ChangeSection'))
);
const ChangeDetails = Loadable(
  lazy(
    () =>
      import('../views/menu/support/changeManagement/changeDetail/ChangeDetail')
  )
);
// Help
const ContactUs = Loadable(lazy(() => import('../views/menu/help/ContactUs')));
// const UserGuide = Loadable(lazy(() => import("../views/menu/help/UserGuide")));
/** *** Auth Pages ****/
const Login = Loadable(lazy(() => import('../views/auth/Login')));

const ForgotPassword = Loadable(
  lazy(() => import('../views/auth/ForgotPassword'))
);
const ResetPassword = Loadable(
  lazy(() => import('../views/auth/ResetPassword'))
);
const Forbidden = Loadable(lazy(() => import('../views/auth/error/Forbidden')));
const NotFound = Loadable(lazy(() => import('../views/auth/error/NotFound')));
const UserDisabled = Loadable(
  lazy(() => import('../views/auth/userLocked/userDisabled'))
);
const UserLocked = Loadable(
  lazy(() => import('../views/auth/userLocked/userLocked'))
);
const DeviceAddressChange = Loadable(
  lazy(() => import('../components/device/details/DeviceAddressChange'))
);

// TODO: We should validate that it isn't an invalid/expired token.
const token = localStorage.getItem('accessToken');

export interface RoutePath {
  path: string;
  name?: string;
  element: React.ReactNode;
  children?: RoutePath[];
  roles?: Roles[];
  exact?: boolean;
}
/** ***Routes******/
const ThemeRoutes: RoutePath[] = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      {
        path: '/',
        name: 'Home',
        element: (
          <Navigate to={token ? '/monitoring/devices' : '/auth/login'} />
        ),
      },
      {
        path: '/monitoring/devices',
        name: 'devices',
        exact: true,
        element: <DevicesSection />,
      },
      {
        path: '/monitoring/members',
        name: 'members',
        exact: true,
        element: <MembersSection />,
      },
      {
        path: '/monitoring/devices/device-detail/:deviceName',
        name: 'deviceDetail',
        exact: true,
        element: <DeviceDetail />,
      },
      {
        path: '/administration/company',
        name: 'companyProfiles',
        exact: true,
        element: <CompanyProfileName />,
      },
      {
        path: '/administration/:companyProfile',
        name: 'companyAdministration',
        exact: true,
        element: <Administration />,
      },
      {
        path: '/administration/user',
        name: 'userAdministration',
        exact: true,
        element: <UserProfile />,
      },
      {
        path: '/support/change-management',
        name: 'changeManagement',
        exact: true,
        element: <ChangeSection />,
      },
      {
        path: '/support/change-management/change-detail/:changeTicketId/devices',
        name: 'changeManagementDetail',
        exact: true,
        element: <DeviceDetail />,
      },
      {
        path: '/monitoring/devices/device-detail/:deviceName/device-address-change/edit',
        name: 'deviceAddressChange',
        exact: true,
        element: <DeviceAddressChange />,
      },
      {
        path: '/support/change-management',
        name: 'changeManagement',
        exact: true,
        element: <ChangeSection />,
      },
      {
        path: '/support/change-management/change-detail/:changeTicketId/devices',
        name: 'changeManagementDetail',
        exact: true,
        element: <ChangeDetails />,
      },
      {
        path: '/help/contactUS',
        name: 'contactUs',
        exact: true,
        element: <ContactUs />,
      },
      {
        path: '/help/userGuide',
        name: 'UserAccount',
        exact: true,
        element: <div />,
      },
      {
        path: '/help/userGuide/introduction',
        name: 'UserAccount',
        exact: true,
        element: <div />,
      },
      {
        path: '/help/userGuide/lvc',
        name: 'UserAccount',
        exact: true,
        element: <div />,
      },
      {
        path: '/help/userGuide/devices',
        name: 'UserAccount',
        exact: true,
        element: <div />,
      },
      {
        path: '/help/userGuide/details',
        name: 'UserAccount',
        exact: true,
        element: <div />,
      },
      {
        path: '/help/userGuide/monitoring',
        name: 'UserAccount',
        exact: true,
        element: <div />,
      },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      {
        path: 'password/forgot',
        name: 'forgotPassword',
        element: <ForgotPassword />,
      },
      {
        path: 'login',
        name: 'login',
        element: !token ? <Login /> : <Navigate to="/monitoring/devices" />,
      },
      {
        path: '403',
        name: 'forbidden',
        element: <Forbidden />,
      },
      {
        path: '404',
        name: 'notFound',
        element: <NotFound />,
      },
      {
        path: 'UserDisabled',
        name: 'UserDisabled',
        exact: true,
        element: <UserDisabled />,
      },
      {
        path: 'UserLocked',
        name: 'UserLocked',
        exact: true,
        element: <UserLocked />,
      },
    ],
  },
  {
    path: 'password/reset/:guid',
    name: 'resetPassword',
    element: <ResetPassword />,
  },
  {
    path: '/user',
    element: <FullLayout />,
    children: [
      { path: 'profile', name: 'profile', element: <Profile /> },
      {
        path: 'profile/user-administration/:username',
        name: 'profileAdministration',
        element: <AssociateCompanyProfiles />,
      },
    ],
  },
  {
    path: '*',
    element: <BlankLayout />,
    children: [
      { path: '*', name: 'notFound', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default ThemeRoutes;
