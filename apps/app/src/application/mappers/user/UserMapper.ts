import { IUserViewModel } from '@/ui/models'
import { IUser } from '@notifica-ufba/domain/entities'

export class UserMapper {
  static toViewModel(user: IUser): IUserViewModel {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt.toLocaleDateString(),
      updatedAt: user.updatedAt.toLocaleDateString(),
    }
  }
}
