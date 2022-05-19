import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { IDisciplineGroupViewModel } from '@/ui/models'
import { TeacherMapper } from '../teacher/TeacherMapper'

export class DisciplineGroupMapper {
  static toViewModel(group: IDisciplineGroup): IDisciplineGroupViewModel {
    return {
      id: group.id,
      code: group.code,
      semester: group.semester,
      description: group.description,
      place: group.place,
      menuUrl: group.menuUrl,
      classTime: group.classTime.toLocaleDateString(),
      teacherId: group.teacherId,
      disciplineId: group.disciplineId,
      teacher: group.teacher
        ? TeacherMapper.toViewModel(group.teacher)
        : undefined,
      createdAt: group.createdAt.toLocaleDateString(),
      updatedAt: group.updatedAt.toLocaleDateString(),
    }
  }
}
