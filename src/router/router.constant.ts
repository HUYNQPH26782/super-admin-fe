import { TYPE_MANAGEMENT } from "../interface/constants/type/Type.const";
import SystemManagementIndex from "../pages/systemManagement";
import RolesManagementIndex from "../pages/systemManagement/rolesManagement";
import CRUDRolesManagement from "../pages/systemManagement/rolesManagement/CURDRoleManagement";

type RouterType = {
  path: string;
  name: string;
  type: string;
  title: string;
  component: any;
};

const url = "/supper-admin";
export const ROUTER_BASE = {
  systemManagement: {
    path: `${url}/system-management`,
    name: "systemManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "systemManagement",
    component: SystemManagementIndex
  } as RouterType,

  roleManagement: {
    path: `${url}/system-management/roles`,
    name: "rolesManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "systemManagement",
    component: RolesManagementIndex
  } as RouterType,

  curdRoleManagement: {
    path: `${url}/system-management/roles`,
    name: "curdRoleManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "systemManagement",
    component: CRUDRolesManagement
  } as RouterType,

};
