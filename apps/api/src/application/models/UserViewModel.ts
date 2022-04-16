import { IUserDTO } from '@/domain/dtos'

export class UserViewModel {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static fromDTO(user: IUserDTO) {
    return new UserViewModel(
      user.id,
      user.name,
      user.email,
      user.createdAt.toISOString(),
      user.updatedAt.toISOString(),
    )
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
