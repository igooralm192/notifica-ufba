import { ITeacher } from '@notifica-ufba/domain/entities'

import { ITeacherViewModel } from '@/ui/models'

import { UserMapper } from '../user/UserMapper'

export class TeacherMapper {
  static toViewModel(teacher: ITeacher): ITeacherViewModel {
    return {
      id: teacher.id,
      userId: teacher.userId,
      user: teacher.user ? UserMapper.toViewModel(teacher.user) : undefined,
      createdAt: teacher.createdAt.toLocaleDateString(),
      updatedAt: teacher.updatedAt.toLocaleDateString(),
    }
  }
}
