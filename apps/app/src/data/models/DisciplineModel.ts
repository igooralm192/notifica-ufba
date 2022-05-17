import { IDiscipline } from '@notifica-ufba/domain/entities'

export class DisciplineModel {
  constructor(
    public id: string,
    public name: string,
    public code: string,
    public course: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static fromJSON(data: Record<string, any>) {
    return new DisciplineModel(
      data.id,
      data.name,
      data.code,
      data.course,
      data.createdAt,
      data.updatedAt,
    )
  }

  toEntity(): IDiscipline {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      course: this.course,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}
