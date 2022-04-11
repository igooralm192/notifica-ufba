import { UserEntity } from '@/domain/entities'

export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static fromJSON(data: Record<string, any>): UserModel {
    return new UserModel(
      data.id,
      data.name,
      data.email,
      data.created_at,
      data.updated_at,
    )
  }

  toEntity(): UserEntity {
    return new UserEntity(
      this.id,
      this.name,
      this.email,
      new Date(this.createdAt),
      new Date(this.updatedAt),
    )
  }
}
