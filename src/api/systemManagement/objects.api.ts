import { Method, request } from "../../helper/request.helper";

export class ObjectsAPI {
  static readonly COMPONENT_NAME: string = "super-admin/object-management";

  static getObjects = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
    });
  };
}
