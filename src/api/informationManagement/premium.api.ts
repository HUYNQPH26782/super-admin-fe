import { Method, request } from "../../helper/request.helper";
import { PremiumRequest } from "../../interface/request/informationManagement/PremiumRequest.inteface";

export class PremiumAPI {
  static readonly COMPONENT_NAME: string = "super-admin/premium-management";

  static getAllPremium = (filter:any) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/list`,
      data: filter
    });
  };

  static addObject = (data:PremiumRequest) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data: data
    });
  };
  
  static updateObject = (data:PremiumRequest) => {
    return request({
      method: Method.PUT,
      url: `/${this.COMPONENT_NAME}`,
      data: data
    });
  };
}
