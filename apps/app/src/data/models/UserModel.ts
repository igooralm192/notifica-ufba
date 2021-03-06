import { IUser, IUserType } from '@notifica-ufba/domain/entities'

export class UserModel {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public type: IUserType,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static fromJSON(data: Record<string, any>) {
    return new UserModel(
      data.id,
      data.name,
      data.email,
      data.type,
      data.createdAt,
      data.updatedAt,
    )
  }

  toEntity(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: 'fake-password',
      type: this.type,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}
