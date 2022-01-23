import { UserEntity } from '@notifica-ufba/domain/entities'
import { IUserDTO } from '@/data/dtos'

export class UserMapper {
  static toEntity(user: IUserDTO): UserEntity {
    return new UserEntity(
      user.id,
      user.name,
      user.email,
      'any_password',
      new Date(user.created_at),
      new Date(user.updated_at),
    )
  }
}
