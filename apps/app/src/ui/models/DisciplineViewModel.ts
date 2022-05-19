import { IDisciplineGroupViewModel } from './DisciplineGroupViewModel'

export interface IDisciplineViewModel {
  id: string
  name: string
  code: string
  course: string
  groups?: IDisciplineGroupViewModel[]
  createdAt: string
  updatedAt: string
}
