import { DisciplineGroupModel } from '@/data/models/DisciplineGroupModel'
import { IDiscipline } from '@notifica-ufba/domain/entities'

export class DisciplineModel {
  constructor(
    public id: string,
    public name: string,
    public code: string,
    public course: string,
    public groups: Record<string, any>[] | undefined,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static fromJSON(data: Record<string, any>) {
    return new DisciplineModel(
      data.id,
      data.name,
      data.code,
      data.course,
      data.groups,
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
      groups: this.groups
        ? this.groups.map(group =>
            DisciplineGroupModel.fromJSON(group).toEntity(),
          )
        : undefined,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}
