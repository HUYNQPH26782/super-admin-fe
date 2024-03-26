import { TableParams } from "../../../../components/table-base/TableTemplate";

export interface ObjectsRequest extends TableParams {
    code: string,
    name: string
}