import { IDisciplineDTO } from '@notifica-ufba/domain/dtos'
import { BaseViewModel, IViewModel } from '../helpers'

export type IDisciplineViewModel = IViewModel &
  Pick<DisciplineViewModel, 'name' | 'code' | 'course' | 'semester'>

export class DisciplineViewModel extends BaseViewModel {
  name: string
  code: string
  course: string
  semester: string

  constructor({
    name,
    code,
    course,
    semester,
    ...entity
  }: IDisciplineViewModel) {
    super(entity)

    this.name = name
    this.code = code
    this.course = course
    this.semester = semester
  }

  static fromDTO(discipline: IDisciplineDTO) {
    return new DisciplineViewModel({
      id: discipline.id,
      name: discipline.name,
      code: discipline.code,
      course: discipline.course,
      semester: discipline.semester,
      createdAt: discipline.createdAt.toISOString(),
      updatedAt: discipline.updatedAt.toISOString(),
    })
  }
}
