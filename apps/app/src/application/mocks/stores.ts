import { IAuthStore } from '@/application/stores'

export class MockedAuthStore implements IAuthStore {
  user = null

  setUser(): void {
    throw new Error('Method not implemented.')
  }
}
