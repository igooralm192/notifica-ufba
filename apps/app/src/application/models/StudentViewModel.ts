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
      id: student.id,
      matriculation: student.matriculation,
      course: student.course,
      userId: student.userId,
      user: student.user ? UserViewModel.fromDTO(student.user) : undefined,
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString(),
    })
  }
}
