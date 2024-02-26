import React, { ReactNode } from 'react';
import {
  faBriefcase,
  faBuilding,
  faBuildingUser,
  faCircleQuestion,
  faCompass,
  faEnvelope,
  faFileLines,
  faUserGear,
  faCircleNodes,
  faScrewdriverWrench,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ISidebarData {
  id: number;
  key: string;
  label: ReactNode;
  href: string;
  icon: ReactNode;
  children?: ISidebarData[];
}

export const SidebarData: ISidebarData[] = [
  {
    id: 1,
    key: 'monitoring',
    label: 'monitoring',
    href: '/monitoring',
    icon: <FontAwesomeIcon icon={faCompass} />,
    children: [
      {
        id: 1.2,
        key: 'monitoringDevices',
        label: 'devices',
        href: '/monitoring/devices',
        icon: <FontAwesomeIcon icon={faBriefcase} />,
      },
      {
        id: 1.3,
        key: 'memberConnectivity',
        label: 'members',
        href: '/monitoring/members',
        icon: <FontAwesomeIcon icon={faCircleNodes} />,
      },
    ],
  },
  {
    id: 2,
    key: 'administration',
    label: 'administration',
    href: '/administration',
    icon: <FontAwesomeIcon icon={faBuildingUser} />,
    children: [
      {
        id: 2.1,
        key: 'companyProfileAdministration',
        label: 'companyAdministration',
        href: '/administration/company',
        icon: <FontAwesomeIcon icon={faBuilding} />,
      },
      {
        id: 2.2,
        key: 'userAdministration',
        label: 'userAdministration',
        href: '/administration/user',
        icon: <FontAwesomeIcon icon={faUserGear} />,
      },
      {
        id: 2.3,
        key: 'entityProfileAdministration',
        label: 'entityProfiles',
        href: '/administration/entity-profiles',
        icon: <FontAwesomeIcon icon={faAddressCard} />,
      },
      {
        id: 2.4,
        key: 'roleAdministration',
        label: 'userRoles',
        href: '/administration/user-roles',
        icon: <FontAwesomeIcon icon={faAddressCard} />,
      },
    ],
  },
  {
    id: 3,
    key: 'contact',
    label: 'contact',
    href: '/contact',
    icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
    children: [
      {
        id: 3.1,
        key: 'contactInformation',
        label: 'contactInformation',
        href: '/contact/contact-information',
        icon: <FontAwesomeIcon icon={faUserGear} />,
      },
    ],
  },
  {
    id: 4,
    key: 'support',
    label: 'support',
    href: '/support',
    icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
    children: [
      {
        id: 4.1,
        key: 'changeManagement',
        label: 'changeManagement',
        href: '/support/change-management',
        icon: <FontAwesomeIcon icon={faUserGear} />,
      },
    ],
  },
  {
    id: 5,
    key: 'help',
    label: 'help',
    href: '/help',
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    children: [
      {
        id: 4.1,
        key: 'contactUs',
        label: 'contactUs',
        href: '/help/contact-us',
        icon: <FontAwesomeIcon icon={faEnvelope} />,
      },
      {
        id: 4.2,
        key: 'userGuide',
        label: 'userGuide',
        href: '/help/user-guide',
        icon: <FontAwesomeIcon icon={faFileLines} />,
      },
    ],
  },
];
