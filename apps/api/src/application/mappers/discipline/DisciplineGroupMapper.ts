import { TeacherMapper } from '@/application/mappers/teacher/TeacherMapper'
import { IDisciplineGroupDTO } from '@notifica-ufba/domain/dtos'
import { IDisciplineGroup } from '@notifica-ufba/domain/entities'

export class DisciplineGroupMapper {
  static toDTO(group: IDisciplineGroup): IDisciplineGroupDTO {
    return {
      id: group.id,
      code: group.code,
      semester: group.semester,
      description: group.description,
      place: group.place,
      menuUrl: group.menuUrl,
      classTime: group.classTime,

      disciplineId: group.disciplineId,
      teacherId: group.teacherId,

      teacher: group.teacher ? TeacherMapper.toDTO(group.teacher) : undefined,

      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    }
  }
}