import { LoginRequest } from "../../common/authManagement/LoginRequest";
import { Method, request } from "../../helper/request.helper";

export class AuthApi {
  static readonly COMPONENT_NAME: string = "auth";

  static login = (data:LoginRequest) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/login/admin`,
      data: data
    });
  };
}
