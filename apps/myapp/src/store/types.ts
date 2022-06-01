import { IAuthStore } from '@/store/auth/types'
import { IDisciplinesStore } from '@/store/disciplines/types'
import { ILastMessagesStore } from '@/store/lastMessages/types'

export interface IAppStore {
  auth: IAuthStore
  disciplines: IDisciplinesStore
  lastMessages: ILastMessagesStore
}
