import React, { ReactNode } from "react";
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
  faScrewdriverWrench
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Roles } from "../../../interfaces/auth/roleAndPermission/role";

export interface ISidebarData {
  id: number;
  roles: string[];
  key: string;
  label: ReactNode;
  href: string;
  icon: ReactNode;
  children?: ISidebarData[];
}

export const SidebarData: ISidebarData[] = [
  {
    id: 1,
    roles: [Roles.Basic, Roles.Admin],
    key: "monitoring",
    label: "monitoring",
    href: "/monitoring",
    icon: <FontAwesomeIcon icon={faCompass} />,
    children: [
      {
        id: 1.2,
        roles: [Roles.Basic, Roles.Admin],
        key: "devices",
        label: "devices",
        href: "/monitoring/devices",
        icon: <FontAwesomeIcon icon={faBriefcase} />
      },
      {
        id: 1.3,
        roles: [Roles.Basic, Roles.Admin],
        key: "members",
        label: "members",
        href: "/monitoring/members",
        icon: <FontAwesomeIcon icon={faCircleNodes} />
      }
    ]
  },
  {
    id: 2,
    roles: [Roles.Admin, Roles.SuperUser],
    key: "administration",
    label: "administration",
    href: "/administration",
    icon: <FontAwesomeIcon icon={faBuildingUser} />,
    children: [
      {
        id: 2.1,
        roles: [Roles.Admin, Roles.SuperUser],
        key: "companyAdministration",
        label: "companyAdministration",
        href: "/administration/company",
        icon: <FontAwesomeIcon icon={faBuilding} />
      },
      {
        id: 2.2,
        roles: [Roles.Admin, Roles.SuperUser],
        key: "userAdministration",
        label: "userAdministration",
        href: "/administration/user",
        icon: <FontAwesomeIcon icon={faUserGear} />
      }
    ]
  },
  {
    id: 3,
    roles: [Roles.Admin, Roles.SuperUser, Roles.Basic],
    key: "support",
    label: "support",
    href: "/support",
    icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
    children: [
      // {
      //   id: 3.1,
      //   roles: [Roles.Admin, Roles.SuperUser, Roles.Basic],
      //   key: "incidentManagement",
      //   label: "incidentManagement",
      //   href: "/support/incidentManagement",
      //   icon: <FontAwesomeIcon icon={faBuilding} />
      // },
      {
        id: 3.2,
        roles: [Roles.Basic, Roles.Admin],
        key: "changeManagement",
        label: "changeManagement",
        href: "/support/change-management",
        icon: <FontAwesomeIcon icon={faUserGear} />
      }
    ]
  },
  {
    id: 4,
    roles: [Roles.Basic, Roles.Admin, Roles.SuperUser],
    key: "help",
    label: "help",
    href: "/help",
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    children: [
      {
        id: 4.1,
        roles: [Roles.Basic, Roles.Admin, Roles.SuperUser],
        key: "contactUs",
        label: "contactUs",
        href: "/help/contactUs",
        icon: <FontAwesomeIcon icon={faEnvelope} />
      },
      {
        id: 4.2,
        roles: [Roles.Basic, Roles.Admin, Roles.SuperUser],
        key: "userGuide",
        label: "userGuide",
        href: "/help/userGuide",
        icon: <FontAwesomeIcon icon={faFileLines} />
      }
    ]
  }
];
