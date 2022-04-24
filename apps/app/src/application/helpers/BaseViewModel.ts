export type IViewModel = Pick<BaseViewModel, 'id' | 'createdAt' | 'updatedAt'>

export class BaseViewModel {
  id: string
  createdAt: string
  updatedAt: string

  constructor({ id, createdAt, updatedAt }: IViewModel) {
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
