import { IDiscipline } from '@notifica-ufba/domain/entities'
import { IDisciplineViewModel } from '@/ui/models'
import { DisciplineGroupMapper } from '@/application/mappers/discipline/DisciplineGroupMapper'

export class DisciplineMapper {
  static toViewModel(discipline: IDiscipline): IDisciplineViewModel {
    return {
      id: discipline.id,
      name: discipline.name,
      code: discipline.code,
      course: discipline.course,
      groups: discipline.groups
        ? discipline.groups.map(group =>
            DisciplineGroupMapper.toViewModel(group),
          )
        : undefined,
      createdAt: discipline.createdAt.toLocaleDateString(),
      updatedAt: discipline.updatedAt.toLocaleDateString(),
    }
  }
}
