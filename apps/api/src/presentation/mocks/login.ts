import { ILoginUseCase, LoginUseCase } from '@notifica-ufba/domain/usecases'

export class MockedLoginUseCase implements ILoginUseCase {
  run(): Promise<LoginUseCase.Result> {
    throw new Error('Method not implemented.')
  }
}
