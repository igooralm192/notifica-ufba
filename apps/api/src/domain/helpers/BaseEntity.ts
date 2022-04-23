export type IEntity = Pick<BaseEntity, 'id' | 'createdAt' | 'updatedAt'>

export class BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date

  constructor({ id, createdAt, updatedAt }: IEntity) {
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
