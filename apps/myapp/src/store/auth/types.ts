import { IUserDTO } from '@notifica-ufba/domain/dtos'

export enum AuthState {
  UNKNOWN = 'unknown',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export interface IAuthStore {
  state: AuthState
  token: string | null
  user: IUserDTO | null
}
