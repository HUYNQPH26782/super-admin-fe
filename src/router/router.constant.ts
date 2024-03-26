import { RouterType } from "../interface/constants/router/RouterType.type";
import { TYPE_MANAGEMENT } from "../interface/constants/type/Type.const";
import SystemManagementIndex from "../pages/systemManagement";
import ObjectsManagementIndex from "../pages/systemManagement/objectsManagement";
import CRUDObjectManagement from "../pages/systemManagement/objectsManagement/CRUDObjectManagement";
import RolesManagementIndex from "../pages/systemManagement/rolesManagement";
import CRUDRolesManagement from "../pages/systemManagement/rolesManagement/CURDRoleManagement";

const url = "/supper-admin";
export const ROUTER_BASE = {
  systemManagement: {
    path: `${url}/system-management`,
    name: "systemManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "systemManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
    ],
    component: SystemManagementIndex,
  } as RouterType,
  // Roles Management
  roleManagement: {
    path: `${url}/system-management/roles`,
    name: "rolesManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "rolesManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "rolesManagement.breakcrumb",
        path: `${url}/system-management/roles`,
      },
    ],
    component: RolesManagementIndex,
  } as RouterType,

  curdRoleManagement: {
    path: `${url}/system-management/roles/:mode/:id`,
    name: "curdRoleManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "rolesManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "rolesManagement.breakcrumb",
        path: `${url}/system-management/roles`,
      },
    ],
    component: CRUDRolesManagement,
  } as RouterType,
  // Objects Management

  objectManagement: {
    path: `${url}/system-management/objects`,
    name: "objectsManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "objectsManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "objectsManagement.breakcrumb",
        path: `${url}/system-management/objects`,
      },
    ],
    component: ObjectsManagementIndex,
  } as RouterType,
  curdObjectsManagement: {
    path: `${url}/system-management/objects/:mode/:id`,
    name: "curdObjectsManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "objectsManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "objectsManagement.breakcrumb",
        path: `${url}/system-management/objects`,
      }
    ],
    component: CRUDObjectManagement,
  } as RouterType,
};
