import { Method, request } from "../../helper/request.helper";
import { ObjectsRequest } from "../../interface/request/systemManagement/objects/ObjectsRequest.interface";

export class ObjectsAPI {
  static readonly COMPONENT_NAME: string = "super-admin/object-management";

  static getObjects = (filter:any) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/list`,
      data: filter
    });
  };

  static addObject = (data:ObjectsRequest) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data: data
    });
  };
}
