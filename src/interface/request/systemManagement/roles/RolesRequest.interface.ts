export interface RolesRequest {
    id: number| string,
    roleCode: string,
    roleName: string,
    isActive: number
    object: Array<string>
}