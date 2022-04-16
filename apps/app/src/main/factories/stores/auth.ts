import { AuthStore } from '@/application/stores'

export const makeAuthStore = () => {
  return new AuthStore()
}
