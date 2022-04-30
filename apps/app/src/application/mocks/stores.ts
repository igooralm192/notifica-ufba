import { AuthState, IAuthStore } from '@/application/stores'

export class MockedAuthStore implements IAuthStore {
  state = AuthState.UNKNOWN
  user = null
  isAuthenticated = false

  setUser(): void {
    throw new Error('Method not implemented.')
  }

  setToken(): void {
    throw new Error('Method not implemented.')
  }
}
