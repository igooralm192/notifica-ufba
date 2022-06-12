export interface IPaginateListInputDTO {
  page?: number
  limit?: number
}

export type IFilterListInputDTO<T> = {
  [K in keyof T]?: T[K] extends string[] ? { has?: string } : never
}
