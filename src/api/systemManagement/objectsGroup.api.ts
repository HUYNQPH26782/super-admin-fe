import { Method, request } from "../../helper/request.helper";
import { ObjectsGroupRequest } from "../../interface/request/systemManagement/object-group/ObjectGroupRequest.interface";

export class ObjectsGroupAPI {
  static readonly COMPONENT_NAME: string = "super-admin/object-group";

  static getObjects = (filter:any) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/list`,
      data: filter
    });
  };

  static addObject = (data:ObjectsGroupRequest) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data: data
    });
  };
  
  static updateObject = (data:ObjectsGroupRequest) => {
    return request({
      method: Method.PUT,
      url: `/${this.COMPONENT_NAME}`,
      data: data
    });
  };
  
  static deleteObject = (id:String) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}?id=${id}`,
    });
  };
  
  static detailObject = (id:String) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}?id=${id}`,
    });
  };
  
  static getRoleAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/role-all`,
    });
  };
  
  static getObjectAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/object-all`,
    });
  };
  
  static getModuleAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/module-all`,
    });
  };
}
