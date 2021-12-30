import { LoginUseCase } from '@notifica-ufba/domain/usecases'
import { Either } from '@notifica-ufba/utils'

export class FakeLoginUseCase implements LoginUseCase {
  async run(): Promise<Either<LoginUseCase.Errors, LoginUseCase.Result>> {
    throw new Error('Method not implemented.')
  }
}
