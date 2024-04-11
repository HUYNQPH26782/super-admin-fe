export interface IMenu {
    id?: number;
    code?: string;
    name?: number;
    icon: string,
    url?: string;
    parentId?: string;
    orderBy?: string;
    childId?: IMenu[];
}
