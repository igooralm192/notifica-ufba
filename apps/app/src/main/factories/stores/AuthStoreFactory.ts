import { AuthStore } from '@/application/stores'

const authStore = new AuthStore()

export const makeAuthStore = () => {
  return authStore
}
