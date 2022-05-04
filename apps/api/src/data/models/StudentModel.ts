import { IStudentDTO } from '@notifica-ufba/domain/dtos'
import { IStudentEntity } from '@notifica-ufba/domain/entities'
import { BaseModel, IModel } from '@/data/helpers'
import { UserModel } from './UserModel'

export type IStudentModel = IModel &
  Pick<StudentModel, 'matriculation' | 'course' | 'userId' | 'user'>

export class StudentModel extends BaseModel {
  matriculation: string
  course: string
  userId: string
  user?: UserModel

  constructor({
    matriculation,
    course,
    userId,
    user,
    ...entity
  }: IStudentModel) {
    super(entity)

    this.matriculation = matriculation
    this.course = course
    this.userId = userId
    this.user = user
  }

  static fromEntity(student: IStudentEntity) {
    return new StudentModel({
      id: student.id,
      matriculation: student.matriculation,
      course: student.course,
      userId: student.userId,
      user: student.user ? UserModel.fromEntity(student.user) : undefined,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    })
  }

  toDTO(): IStudentDTO {
    return {
      id: this.id,
      matriculation: this.matriculation,
      course: this.course,
      userId: this.userId,
      user: this.user?.toDTO(),
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}
