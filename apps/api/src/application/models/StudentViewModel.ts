import { IStudentDTO } from '@/domain/dtos'
import { BaseViewModel, IViewModel } from '@/application/helpers'

import { UserViewModel } from './UserViewModel'

export type IStudentViewModel = IViewModel &
  Pick<StudentViewModel, 'matriculation' | 'course' | 'userId' | 'user'>

export class StudentViewModel extends BaseViewModel {
  matriculation: string
  course: string
  userId: string
  user?: UserViewModel

  constructor({
    matriculation,
    course,
    userId,
    user,
    ...entity
  }: IStudentViewModel) {
    super(entity)

    this.matriculation = matriculation
    this.course = course
    this.userId = userId
    this.user = user
  }

  static fromDTO(student: IStudentDTO) {
    return new StudentViewModel({
      ...student,
      user: student.user ? UserViewModel.fromDTO(student.user) : undefined,
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString(),
    })
  }

  toJSON() {
    return {
      id: this.id,
      matriculation: this.matriculation,
      course: this.course,
      userId: this.userId,
      user: this.user ? this.user.toJSON() : undefined,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    }
  }
}
