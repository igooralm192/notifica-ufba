import { UserEntity } from '@/domain/entities'
import { BaseEntity, IEntity } from '@/domain/helpers'

export type IStudentEntity = IEntity &
  Pick<StudentEntity, 'matriculation' | 'course' | 'userId' | 'user'>

export class StudentEntity extends BaseEntity {
  matriculation: string
  course: string
  userId: string
  user?: UserEntity

  constructor({
    matriculation,
    course,
    userId,
    user,
    ...entity
  }: IStudentEntity) {
    super(entity)

    this.matriculation = matriculation
    this.course = course
    this.userId = userId
    this.user = user
  }
}
