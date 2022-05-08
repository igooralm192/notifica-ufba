import { IDisciplineDTO } from '@notifica-ufba/domain/dtos'
import { IDisciplineEntity } from '@notifica-ufba/domain/entities'
import { BaseModel, IModel } from '../helpers'

export type IDisciplineModel = IModel &
  Pick<DisciplineModel, 'name' | 'code' | 'course' | 'semester'>

export class DisciplineModel extends BaseModel {
  name: string
  code: string
  course: string
  semester: string

  constructor({ name, code, course, semester, ...entity }: IDisciplineModel) {
    super(entity)

    this.name = name
    this.code = code
    this.course = course
    this.semester = semester
  }

  static fromEntity(discipline: IDisciplineEntity) {
    return new DisciplineModel({
      id: discipline.id,
      name: discipline.name,
      code: discipline.code,
      course: discipline.course,
      semester: discipline.semester,
      createdAt: discipline.createdAt,
      updatedAt: discipline.updatedAt,
    })
  }

  toDTO(): IDisciplineDTO {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      course: this.course,
      semester: this.semester,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
