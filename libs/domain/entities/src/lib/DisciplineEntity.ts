import { BaseEntity, IEntity } from '../helpers'

export type IDisciplineEntity = IEntity &
  Pick<DisciplineEntity, 'name' | 'code' | 'course' | 'semester'>

export class DisciplineEntity extends BaseEntity {
  name: string
  code: string
  course: string
  semester: string

  constructor({ name, code, course, semester, ...entity }: IDisciplineEntity) {
    super(entity)

    this.name = name
    this.code = code
    this.course = course
    this.semester = semester
  }
}
