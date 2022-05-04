import { BaseEntity, IEntity } from '../helpers'

export type IUserEntity = IEntity &
  Pick<UserEntity, 'name' | 'email' | 'password' | 'type'>

export type IUserType = 'STUDENT' | 'TEACHER'

export class UserEntity extends BaseEntity {
  name: string
  email: string
  password: string
  type: IUserType

  constructor({
    name,
    email,
    password,
    type = 'STUDENT',
    ...entity
  }: IUserEntity) {
    super(entity)

    this.name = name
    this.email = email
    this.password = password
    this.type = type
  }
}
