import { IUserDTO } from '@/domain/dtos'
import { BaseViewModel, IViewModel } from '@/application/helpers'

export type IUserViewModel = IViewModel & Pick<UserViewModel, 'name' | 'email'>

export class UserViewModel extends BaseViewModel {
  name: string
  email: string

  constructor({ name, email, ...entity }: IUserViewModel) {
    super(entity)

    this.name = name
    this.email = email
  }

  static fromDTO(user: IUserDTO) {
    return new UserViewModel({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    })
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    }
  }
}
