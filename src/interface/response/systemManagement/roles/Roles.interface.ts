import { IBase } from "../../../Base.interface";

export interface IRoles extends IBase {
    id?: number;
    title?: string;
    price?: number;
    color?: string;
    size?: string;
    photoURL?: string;
    metaDescription?: string;
    categoryProductId?: number;
}
