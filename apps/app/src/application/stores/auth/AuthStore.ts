import { UserViewModel } from '@/application/models'

export interface IAuthStore {
  user: UserViewModel | null
  setUser(user: UserViewModel | null): void
  setToken(token: string | null): void
}

export class AuthStore implements IAuthStore {
  private _user: UserViewModel | null = null
  private _token: string | null = null

  get user() {
    return this._user
  }

  get token() {
    return this._token
  }

  setUser(user: UserViewModel | null): void {
    this._user = user
  }

  setToken(token: string | null): void {
    this._token = token
  }
}
