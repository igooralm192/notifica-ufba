import { TeacherModel } from '@/data/models/TeacherModel'
import { IDisciplineGroup } from '@notifica-ufba/domain/entities'

export class DisciplineGroupModel {
  constructor(
    public id: string,
    public code: string,
    public semester: string,
    public description: string,
    public place: string,
    public menuUrl: string,
    public classTime: string,
    public teacherId: string,
    public teacher: Record<string, any> | undefined,
    public disciplineId: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static fromJSON(data: Record<string, any>) {
    return new DisciplineGroupModel(
      data.id,
      data.code,
      data.semester,
      data.description,
      data.place,
      data.menuUrl,
      data.classTime,
      data.teacherId,
      data.teacher,
      data.disciplineId,
      data.createdAt,
      data.updatedAt,
    )
  }

  toEntity(): IDisciplineGroup {
    return {
      id: this.id,
      code: this.code,
      semester: this.semester,
      description: this.description,
      place: this.place,
      menuUrl: this.menuUrl,
      classTime: new Date(this.classTime),
      teacherId: this.teacherId,
      teacher: this.teacher
        ? TeacherModel.fromJSON(this.teacher).toEntity()
        : undefined,
      disciplineId: this.disciplineId,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}
