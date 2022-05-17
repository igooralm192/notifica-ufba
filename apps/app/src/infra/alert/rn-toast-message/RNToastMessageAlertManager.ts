import { IAlertManager } from '@/application/managers'

import Toast from 'react-native-toast-message'

export class RNToastMessageAlertManager implements IAlertManager {
  show({ type, title, message }: IAlertManager.Input) {
    Toast.show({ type, text1: title, text2: message })
  }
}
