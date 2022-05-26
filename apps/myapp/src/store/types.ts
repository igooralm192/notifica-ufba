import { IAuthStore } from '@/store/auth/types'
import { IDisciplinesStore } from '@/store/disciplines/types'

export interface IAppStore {
  auth: IAuthStore
  disciplines: IDisciplinesStore
}
