import { BaseModel, IModel } from '@/domain/helpers'
import { IUserDTO } from '@/domain/dtos'

export type IUserModel = IModel & Pick<UserModel, 'name' | 'email' | 'type'>

export class UserModel extends BaseModel {
  name: string
  email: string
  type: 'STUDENT' | 'TEACHER'

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
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    })
  }

  toDTO(): IUserDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      type: this.type,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}
