type RouterType = {
  path: string;
  name: string;
};

const url = "/supper-admin/";
export const ROUTER_BASE = {
  systemManagement: {
    path: `${url}system-management`,
    name: "systemManagement",
  } as RouterType,
};
