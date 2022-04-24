import { UserViewModel } from '@/application/models'

export interface IAuthStore {
  user: UserViewModel | null
  setUser(user: UserViewModel | null): void
}

export class AuthStore implements IAuthStore {
  private _user: UserViewModel | null = null

  get user() {
    return this._user
  }

  setUser(user: UserViewModel | null): void {
    this._user = user
  }
}
