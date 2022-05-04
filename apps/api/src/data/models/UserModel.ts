import { IUserDTO } from '@notifica-ufba/domain/dtos'
import { IUserEntity, IUserType } from '@notifica-ufba/domain/entities'
import { BaseModel, IModel } from '@/data/helpers'

export type IUserModel = IModel &
  Pick<UserModel, 'name' | 'email' | 'password' | 'type'>

export class UserModel extends BaseModel {
  name: string
  email: string
  password: string
  type: IUserType

  constructor({ name, email, password, type, ...entity }: IUserModel) {
    super(entity)

    this.name = name
    this.email = email
    this.password = password
    this.type = type
  }

  static fromEntity(user: IUserEntity) {
    return new UserModel({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  toDTO(): IUserDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
