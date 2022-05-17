import { IAlertManager } from '@/application/managers'
import { RNToastMessageAlertManager } from '@/infra/alert/rn-toast-message'

export const makeAlertManager = (): IAlertManager => {
  return new RNToastMessageAlertManager()
}
