import { IStudentDTO } from '@notifica-ufba/domain/dtos'
import { IStudent } from '@notifica-ufba/domain/entities'

import { UserMapper } from '@/application/mappers'

export class StudentMapper {
  static toDTO(student: IStudent): IStudentDTO {
    return {
      id: student.id,
      matriculation: student.matriculation,
      course: student.course,
      userId: student.userId,
      user: student.user ? UserMapper.toDTO(student.user) : undefined,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }
  }
}
