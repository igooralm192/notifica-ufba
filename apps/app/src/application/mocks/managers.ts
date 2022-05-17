import { IAlertManager } from '@/application/managers'

export class MockedAlertManager implements IAlertManager {
  show(input: IAlertManager.Input): void {
    throw new Error('Method not implemented.')
  }
}
