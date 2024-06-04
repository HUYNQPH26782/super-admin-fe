import { Method, request } from "../../helper/request.helper";

export class JsonTokenApi {
  static readonly COMPONENT_NAME: string = "developer/json-token";

  static decodeToken = (token: string) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/decode-token`,
      data: {
        token: token
      }
    });
  };
}
