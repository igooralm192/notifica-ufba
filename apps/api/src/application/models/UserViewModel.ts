import { IUserDTO } from '@notifica-ufba/domain/dtos'
import { BaseViewModel, IViewModel } from '@/application/helpers'

export type IUserViewModel = IViewModel &
  Pick<UserViewModel, 'name' | 'email' | 'type'>

export class UserViewModel extends BaseViewModel {
  name: string
  email: string
  type?: 'STUDENT' | 'TEACHER'

  constructor({ name, email, type, ...entity }: IUserViewModel) {
    super(entity)

    this.name = name
    this.email = email
    this.type = type
  }

  static fromDTO(user: IUserDTO) {
    return new UserViewModel({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    })
  }
}
