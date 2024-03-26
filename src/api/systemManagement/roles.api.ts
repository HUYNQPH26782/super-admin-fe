import { Method, request } from "../../helper/request.helper";

export class RolesAPI {
  static readonly COMPONENT_NAME: string = "super-admin/roles";

  static getRoles = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
    });
  };
}
