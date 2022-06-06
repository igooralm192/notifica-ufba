import { ICreateMessagingService } from '@/data/contracts'
import { OneSignalMessagingService } from '@/infra/services/onesignal/OneSignalMessagingService'

import env from '@/main/config/env'
import { onesignalApi } from '@/main/config/onesignal'

type MessagingService = ICreateMessagingService

export const makeMessagingService = (): MessagingService => {
  return new OneSignalMessagingService(onesignalApi, env.ONESIGNAL_APP_ID)
}
