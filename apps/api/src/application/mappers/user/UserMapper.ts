import { IUserDTO } from '@notifica-ufba/domain/dtos'
import { IUser } from '@notifica-ufba/domain/entities'
import { StudentMapper } from '@/application/mappers/student/StudentMapper'
import { TeacherMapper } from '@/application/mappers/teacher/TeacherMapper'

export class UserMapper {
  static toDTO(user: IUser): IUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,

      teacher: user.teacher ? TeacherMapper.toDTO(user.teacher) : undefined,
      student: user.student ? StudentMapper.toDTO(user.student) : undefined,

      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
