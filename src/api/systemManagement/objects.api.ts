import { Method, request } from "../../helper/request.helper";

export class ObjectsAPI {
  static readonly COMPONENT_NAME: string = "super-admin/object-management";

  static getObjects = (filter:any) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/list`,
      data: filter
    });
  };
}
