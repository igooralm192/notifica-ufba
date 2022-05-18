import { ITeacherDTO } from '@notifica-ufba/domain/dtos'
import { ITeacher } from '@notifica-ufba/domain/entities'

import { UserMapper } from '@/application/mappers'

export class TeacherMapper {
  static toDTO(teacher: ITeacher): ITeacherDTO {
    return {
      id: teacher.id,
      userId: teacher.userId,
      user: teacher.user ? UserMapper.toDTO(teacher.user) : undefined,
      createdAt: teacher.createdAt,
      updatedAt: teacher.updatedAt,
    }
  }
}
