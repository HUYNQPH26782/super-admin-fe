import { IBase } from "../../../Base.interface";

export interface IObjectsGroup extends IBase {
    id?: string;
    code?: string;
    name: string;
    subName: string;
    urlNote: string;
    status: string;
    orderBy: number;
    roleName: string;
}
