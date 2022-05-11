export type IModel = Pick<BaseModel, 'id' | 'createdAt' | 'updatedAt'>

export class BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date

  constructor({ id, createdAt, updatedAt }: IModel) {
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}