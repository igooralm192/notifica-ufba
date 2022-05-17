import { IStudent } from '@notifica-ufba/domain/entities'
import { UserModel } from './UserModel'

export class StudentModel {
  constructor(
    public id: string,
    public matriculation: string,
    public course: string,
    public userId: string,
    public user: Record<string, any> | undefined,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static fromJSON(data: Record<string, any>) {
    return new StudentModel(
      data.id,
      data.matriculation,
      data.course,
      data.userId,
      data.user,
      data.createdAt,
      data.updatedAt,
    )
  }

  toEntity(): IStudent {
    return {
      id: this.id,
      matriculation: this.matriculation,
      course: this.course,
      userId: this.userId,
      user: this.user ? UserModel.fromJSON(this.user).toEntity() : undefined,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}
