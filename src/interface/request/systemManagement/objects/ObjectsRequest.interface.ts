
export interface ObjectsRequest {
    name: string;
    code: string;
    orderBy: number|null;
    icons: string;
    url: string;
    isActive: number|null;
    isStart: number|null;
    type: string;
    key: string;
    parentId: number|null;
}