import { IEntity } from '../interfaces'

export interface IDisciplineEntity extends IEntity {
  name: string
  code: string
  course: string
}
