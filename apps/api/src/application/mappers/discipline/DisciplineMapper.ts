import { IDisciplineDTO } from '@notifica-ufba/domain/dtos'
import { IDiscipline } from '@notifica-ufba/domain/entities'

export class DisciplineMapper {
  static toDTO(discipline: IDiscipline): IDisciplineDTO {
    return {
      id: discipline.id,
      name: discipline.name,
      code: discipline.code,
      course: discipline.course,
      createdAt: discipline.createdAt,
      updatedAt: discipline.updatedAt,
    }
  }
}
