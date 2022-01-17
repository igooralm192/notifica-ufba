import { UserEntity } from '@notifica-ufba/domain/entities'
import { IUserDTO } from '@/presentation/dtos/user'

export class UserMapper {
  static toDTO(entity: UserEntity): IUserDTO {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      created_at: entity.createdAt.toISOString(),
      updated_at: entity.createdAt.toISOString(),
    }
  }
}
