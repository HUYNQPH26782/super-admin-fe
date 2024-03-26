import { Method, request } from "../../helper/request.helper";

export class MenuAPI {
  static readonly COMPONENT_NAME: string = "admin/menu";

  static getMenu = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/get-object`,
    });
  };
}
