import { BaseEntity, IEntity } from '@/domain/helpers'

export type IUserEntity = IEntity &
  Pick<UserEntity, 'name' | 'email' | 'password'>

export class UserEntity extends BaseEntity {
  name: string
  email: string
  password: string

  constructor({ name, email, password, ...entity }: IUserEntity) {
    super(entity)

    this.name = name
    this.email = email
    this.password = password
  }
}
