import { IDisciplineGroupDTO } from '@notifica-ufba/domain/dtos'
import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { TeacherMapper } from '../teacher/TeacherMapper'
import { DisciplineMapper } from '../discipline/DisciplineMapper'

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
      studentIds: group.studentIds,

      teacher: group.teacher ? TeacherMapper.toDTO(group.teacher) : undefined,
      discipline: group.discipline
        ? DisciplineMapper.toDTO(group.discipline)
        : undefined,

      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    }
  }
}
