import { IDiscipline } from '@notifica-ufba/domain/entities'
import { IDisciplineViewModel } from '@/ui/models'

export class DisciplineMapper {
  static toViewModel(discipline: IDiscipline): IDisciplineViewModel {
    return {
      id: discipline.id,
      name: discipline.name,
      code: discipline.code,
      course: discipline.course,
      createdAt: discipline.createdAt.toLocaleDateString(),
      updatedAt: discipline.updatedAt.toLocaleDateString(),
    }
  }
}
