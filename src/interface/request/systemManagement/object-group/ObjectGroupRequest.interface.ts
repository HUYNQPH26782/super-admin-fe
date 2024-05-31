
export interface ObjectsGroupRequest {
    id: string;
    code: string;
    name: string;
    subName: string;
    urlNote: string;
    orderBy: number;
    status: string;
    roleId: string;
    moduleId: string;
    object: Array<string>;
}