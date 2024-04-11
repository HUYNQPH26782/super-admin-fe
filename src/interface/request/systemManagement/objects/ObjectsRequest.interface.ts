
export interface ObjectsRequest {
    id: string|number;
    name: string;
    code: string;
    orderBy: number|null;
    icons: string;
    url: string;
    isActive: number|null;
    isStart: string|number|null;
    type: string;
    key: string;
    parentId: number|null;
}