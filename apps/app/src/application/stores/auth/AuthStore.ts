import { UserEntity } from '@/domain/entities'

export interface IAuthStore {
  user: UserEntity | null
  setUser(user: UserEntity | null): void
}

export class AuthStore implements IAuthStore {
  private _user: UserEntity | null = null

  get user() {
    return this._user
  }

  setUser(user: UserEntity | null): void {
    this._user = user
  }
}
