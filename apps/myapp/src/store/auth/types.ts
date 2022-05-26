import { IUser } from '@notifica-ufba/domain/entities'

export enum AuthState {
  UNKNOWN = 'unknown',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export interface IAuthStore {
  state: AuthState
  token: string | null
  user: IUser | null
}
