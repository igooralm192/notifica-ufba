import { IStudent } from '@notifica-ufba/domain/entities'

import { IStudentViewModel } from '@/ui/models'

import { UserMapper } from '../user/UserMapper'

export class StudentMapper {
  static toViewModel(student: IStudent): IStudentViewModel {
    return {
      id: student.id,
      matriculation: student.matriculation,
      course: student.course,
      userId: student.userId,
      user: student.user ? UserMapper.toViewModel(student.user) : undefined,
      createdAt: student.createdAt.toLocaleDateString(),
      updatedAt: student.updatedAt.toLocaleDateString(),
    }
  }
}
