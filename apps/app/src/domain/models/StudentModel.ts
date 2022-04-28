import { IStudentDTO } from '@/domain/dtos'
import { BaseModel, IModel } from '@/domain/helpers'
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

  static fromJSON(data: Record<string, any>) {
    return new StudentModel({
      id: data.id,
      matriculation: data.matriculation,
      course: data.course,
      userId: data.userId,
      user: data.user ? UserModel.fromJSON(data.user) : undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
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
