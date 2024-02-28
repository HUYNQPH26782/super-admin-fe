export interface IMenu {
    id?: number;
    code?: string;
    name?: number;
    url?: string;
    parentId?: string;
    orderBy?: string;
    childId?: IMenu[];
}
