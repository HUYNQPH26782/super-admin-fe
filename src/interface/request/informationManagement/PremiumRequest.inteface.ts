import { IObjectGroup } from "../../response/informationManagement/premium/Premium.interface";

export interface PremiumRequest {
    id?: string|number;
    name?: string;
    code?: string;
    money?: number|null;
    level?: number|null;
    note?: string;
    roleId?: string;
    status?: string;
    type?: string;
    isDefault?: string;
    urlNote?:string;
    objectGroup: IObjectGroup[]
}