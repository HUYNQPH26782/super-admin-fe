import { IBase } from "../../../Base.interface";

export interface IPremium extends IBase {
    
    id?: number;
    code?: string;
    createBy?: string;
    createDate?: string;
    icons?: string;
    isAction?: string;
    key?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    name?: string;
    orderBy?: string;
    parentId?: string;
    type?: string;
    url?: string;
}
