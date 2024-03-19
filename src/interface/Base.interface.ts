export interface IBase {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBaseRequest {
  page: number,
  size: number,
  orderByColumn: string,
  ascendingOrder: boolean
}