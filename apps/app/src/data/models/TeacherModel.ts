import { ITeacher } from '@notifica-ufba/domain/entities'
import { UserModel } from './UserModel'

export class TeacherModel {
  constructor(
    public id: string,
    public userId: string,
    public user: Record<string, any> | undefined,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static fromJSON(data: Record<string, any>) {
    return new TeacherModel(
      data.id,
      data.userId,
      data.user,
      data.createdAt,
      data.updatedAt,
    )
  }

  toEntity(): ITeacher {
    return {
      id: this.id,
      userId: this.userId,
      user: this.user ? UserModel.fromJSON(this.user).toEntity() : undefined,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}
