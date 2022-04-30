import { UserViewModel } from '@/application/models'
import { makeAutoObservable } from 'mobx'

export enum AuthState {
  UNKNOWN = 'unknown',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export interface IAuthStore {
  state: AuthState
  user: UserViewModel | null
  isAuthenticated: boolean
  setUser(user: UserViewModel | null): void
  setToken(token: string | null): void
}

export class AuthStore implements IAuthStore {
  private _state: AuthState = AuthState.UNKNOWN
  private _user: UserViewModel | null = null
  private _token: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get user() {
    return this._user
  }

  get token() {
    return this._token
  }

  get state() {
    return this._state
  }

  get isAuthenticated() {
    return this._state === AuthState.AUTHENTICATED
  }

  setUser(user: UserViewModel | null): void {
    this._user = user
  }

  setToken(token: string | null): void {
    this._token = token
    this._state = token ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED
  }
}
