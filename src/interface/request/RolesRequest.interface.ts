import { TableParams } from "../../components/table-base/TableTemplate";

export interface RolesRequest extends TableParams {
    code: string,
    name: string
}