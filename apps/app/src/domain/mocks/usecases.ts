import { Either } from '@notifica-ufba/utils'
import { ILoginOutput } from '@/domain/ports/outputs'
import { ILoginErrors, ILoginUseCase } from '@/domain/usecases'

export class MockedLoginUseCase implements ILoginUseCase {
  run(): Promise<Either<ILoginErrors, ILoginOutput>> {
    throw new Error('Method not implemented.')
  }
}
