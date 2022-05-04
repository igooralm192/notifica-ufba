import { IUserDTO } from '@notifica-ufba/domain/dtos'
import { IUserType } from '@notifica-ufba/domain/entities'
import { BaseModel, IModel } from '@/data/helpers'

export type IUserModel = IModel & Pick<UserModel, 'name' | 'email' | 'type'>

export class UserModel extends BaseModel {
  name: string
  email: string
  type: IUserType

  constructor({ name, email, type, ...entity }: IUserModel) {
    super(entity)

    this.name = name
    this.email = email
    this.type = type
  }

  static fromJSON(data: Record<string, any>) {
    return new UserModel({
      id: data.id,
      name: data.name,
      email: data.email,
      type: data.type,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
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
