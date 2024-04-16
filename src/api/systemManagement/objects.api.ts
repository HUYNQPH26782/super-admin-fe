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

  static getMenuSelect = (id: string|number|undefined) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/menu-parent?id=${id}`,
    });
  };

  static getObjectDetail = (id: string|number) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}?id=${id}`,
    });
  }

  static getObjectDelete = (id: string|number) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}?id=${id}`,
    });
  }

  static addObject = (data:ObjectsRequest) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data: data
    });
  };
  
  static updateObject = (data:ObjectsRequest) => {
    return request({
      method: Method.PUT,
      url: `/${this.COMPONENT_NAME}`,
      data: data
    });
  };
}
