import { Method, request } from "../../helper/request.helper";
import { RolesRequest } from "../../interface/request/systemManagement/roles/RolesRequest.interface";

export class RolesAPI {
  static readonly COMPONENT_NAME: string = "super-admin/roles";

  static getRoles = (filter:any) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/list`,
      data: filter
    });
  };
  
  static createRoles = (data: RolesRequest) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data: data
    });
  };

  static updateRoles = (data: RolesRequest) => {
    return request({
      method: Method.PUT,
      url: `/${this.COMPONENT_NAME}`,
      data: data
    });
  };

  static detailRoles = (id: string|number) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`
    })
  }

  static deleteRoles = (id: string|number) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`
    })
  }
}
