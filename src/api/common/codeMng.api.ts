import { Method, request } from "../../helper/request.helper";

export class CodeMngApi {
  static readonly COMPONENT_NAME: string = "code";

  static getCodeMng = (codes: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/listCode/${codes}`,
    });
  };
}
