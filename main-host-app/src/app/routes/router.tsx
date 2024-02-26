import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/loadable';

const FullLayout = Loadable(lazy(() => import('../layouts/full-layout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank-layout')));

// Portal App
const DeviceSection = Loadable(
  lazy(() => import('tnso-apps/portal-app/DevicesSection'))
);
const DeviceDetailSection = Loadable(
  lazy(() => import('tnso-apps/portal-app/DeviceDetailSection'))
);
const MembersSection = Loadable(
  lazy(() => import('tnso-apps/portal-app/MembersSection'))
);
const CompanyProfileSection = Loadable(
  lazy(() => import('tnso-apps/portal-app/CompanyAdministrationSection'))
);
const UserProfileSection = Loadable(
  lazy(() => import('tnso-apps/portal-app/UserAdministrationSection'))
);
const Login = Loadable(lazy(() => import('tnso-apps/portal-app/LoginSection')));
const ForgotPassword = Loadable(
  lazy(() => import('tnso-apps/portal-app/ForgotPassword'))
);

// Administration App
const ViewUserRoles = Loadable(
  lazy(() => import('tnso-apps/administration-app/ViewUserRoles'))
);
const CreateUserRoles = Loadable(
  lazy(() => import('tnso-apps/administration-app/CreateUserRoles'))
);
const EditUserRoles = Loadable(
  lazy(() => import('tnso-apps/administration-app/EditUserRoles'))
);
/* import { Roles } from "../interfaces/auth/roleAndPermission/role";

const Profile = Loadable(lazy(() => import("../layouts/header/user/profile/Profile")));
// Devices
// Administration
const Administration = Loadable(lazy(() => import("../views/menu/administration/companyAdministration/Administration")));
const AssociateCompanyProfiles = Loadable(lazy(() => import("../views/menu/administration/userAdministration/AssociateCompanyProfiles")));
// Support
const ChangeSection = Loadable(lazy(() => import("../views/menu/support/changeManagement/ChangeSection")));
const ChangeDetails = Loadable(lazy(() => import("../views/menu/support/changeManagement/changeDetail/ChangeDetail")));
// Help
const ContactUs = Loadable(lazy(() => import("../views/menu/help/ContactUs")));
const UserGuide = Loadable(lazy(() => import("../views/menu/help/UserGuide")));

const ResetPassword = Loadable(lazy(() => import("../views/auth/ResetPassword")));
const Forbidden = Loadable(lazy(() => import("../views/auth/error/Forbidden")));
const NotFound = Loadable(lazy(() => import("../views/auth/error/NotFound")));
const UserDisabled = Loadable(lazy(() => import("../views/auth/userLocked/userDisabled")));
const UserLocked = Loadable(lazy(() => import("../views/auth/userLocked/userLocked")));
const DeviceAddressChange = Loadable(lazy(() => import("../components/device/details/DeviceAddressChange"))); */

// TODO: We should validate that it isn't an invalid/expired token.
const token = localStorage.getItem('accessToken');

export interface RoutePath {
  path: string;
  name?: string;
  element: React.ReactNode;
  children?: RoutePath[];
  /* roles?: Roles[]; */
  roles?: string[];
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
        element: <DeviceSection />,
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
        element: <DeviceDetailSection />,
      },
      {
        path: '/monitoring/devices/device-detail/:deviceName/device-address-change/edit',
        name: 'deviceAddressChange',
        exact: true,
        element: <div />,
      },
      {
        path: '/administration/company',
        name: 'companyProfiles',
        exact: true,
        element: <CompanyProfileSection />,
      },
      {
        path: '/administration/:companyProfile',
        name: 'companyAdministration',
        exact: true,
        element: <UserProfileSection />,
      },
      {
        path: '/administration/user',
        name: 'userAdministration',
        exact: true,
        element: <div />,
      },
      {
        path: '/administration/user-roles',
        name: 'userRoles',
        exact: true,
        element: <ViewUserRoles />,
      },
      {
        path: '/administration/user-roles/create',
        name: 'userRoles',
        exact: true,
        element: <CreateUserRoles />,
      },
      {
        path: '/administration/user-roles/edit/:roleName',
        name: 'userRoles',
        exact: true,
        element: <EditUserRoles />,
      },
      {
        path: '/support/change-management',
        name: 'changeManagement',
        exact: true,
        element: <div />,
      },
      {
        path: '/support/change-management/change-detail/:changeTicketId/devices',
        name: 'changeManagementDetail',
        exact: true,
        element: <div />,
      },
      {
        path: '/support/change-management',
        name: 'changeManagement',
        exact: true,
        element: <div />,
      },
      {
        path: '/support/change-management/change-detail/:changeTicketId/devices',
        name: 'changeManagementDetail',
        exact: true,
        element: <div />,
      },
      {
        path: '/help/contactUS',
        name: 'contactUs',
        exact: true,
        element: <div />,
      },
      {
        path: '/help/userGuide',
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
        element: <div />,
      },
      {
        path: '404',
        name: 'notFound',
        element: <div />,
      },
      {
        path: 'UserDisabled',
        name: 'UserDisabled',
        exact: true,
        element: <div />,
      },
      {
        path: 'UserLocked',
        name: 'UserLocked',
        exact: true,
        element: <div />,
      },
    ],
  },
  {
    path: 'password/reset/:guid',
    name: 'resetPassword',
    element: <div />,
  },
  {
    path: '/user',
    element: <div />,
    children: [
      { path: 'profile', name: 'profile', element: <div /> },
      {
        path: 'profile/user-administration/:username',
        name: 'profileAdministration',
        element: <div />,
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
