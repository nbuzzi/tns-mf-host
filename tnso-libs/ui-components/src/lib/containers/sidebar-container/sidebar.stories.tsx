import { Meta } from '@storybook/react';
import TNSOSidebar from './sidebar-container';
import './sidebar-container.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faBuilding,
  faBuildingUser,
  faCircleNodes,
  faCompass,
  faScrewdriverWrench,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';

const meta = {
  component: TNSOSidebar,
  title: 'Containers/Sidebar',
  tags: ['autodocs'],
} satisfies Meta<typeof TNSOSidebar>;

export default meta;

const data = [
  {
    id: 1,
    // roles: [Roles.Basic, Roles.Admin],
    roles: ['basic', 'admin'],
    key: 'monitoring',
    label: 'monitoring',
    href: '/monitoring',
    icon: <FontAwesomeIcon icon={faCompass} />,
    children: [
      {
        id: 1.2,
        // roles: [Roles.Basic, Roles.Admin],
        roles: ['basic', 'admin'],
        key: 'devices',
        label: 'devices',
        href: '/monitoring/devices',
        icon: <FontAwesomeIcon icon={faBriefcase} />,
      },
      {
        id: 1.3,
        // roles: [Roles.Basic, Roles.Admin],
        roles: ['basic', 'admin'],
        key: 'members',
        label: 'members',
        href: '/monitoring/members',
        icon: <FontAwesomeIcon icon={faCircleNodes} />,
      },
    ],
  },
  {
    id: 2,
    // roles: [Roles.Admin, Roles.SuperUser],
    roles: ['admin', 'superuser'],
    key: 'administration',
    label: 'administration',
    href: '/administration',
    icon: <FontAwesomeIcon icon={faBuildingUser} />,
    children: [
      {
        id: 2.1,
        // roles: [Roles.Admin, Roles.SuperUser],
        roles: ['admin', 'superuser'],
        key: 'companyAdministration',
        label: 'companyAdministration',
        href: '/administration/company',
        icon: <FontAwesomeIcon icon={faBuilding} />,
      },
    ],
  },
  {
    id: 3,
    // roles: [Roles.Admin, Roles.SuperUser, Roles.Basic],
    roles: ['admin', 'superuser', 'basic'],
    key: 'support',
    label: 'support',
    href: '/support',
    icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
    children: [
      {
        id: 3.2,
        // roles: [Roles.Basic, Roles.Admin],
        roles: ['basic', 'admin'],
        key: 'changeManagement',
        label: 'changeManagement',
        href: '/support/change-management',
        icon: <FontAwesomeIcon icon={faUserGear} />,
      },
    ],
  },
];

export const Default = () => (
  <TNSOSidebar
    data={data}
    availableMenuKeys={[]}
    menuItemSelected={data[0].key}
    openKeys={['monitoring']}
    menuKeys={['monitoring']}
    setMenuItemSelected={() => {}}
    setOpenKeys={() => {}}
    isMiniSidebar={false}
    theme="dark"
    mode="inline"
  />
);
