import { IUserDTO } from '@notifica-ufba/domain/dtos'
import { IUser } from '@notifica-ufba/domain/entities'

export class UserMapper {
  static toDTO(user: IUser): IUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
