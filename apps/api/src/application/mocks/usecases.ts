import { Either } from '@notifica-ufba/utils'

import { ICreateUserOutput, ILoginOutput } from '@/domain/ports/outputs'
import {
  ICreateUserErrors,
  ICreateUserUseCase,
  ILoginErrors,
  ILoginUseCase,
} from '@/domain/usecases'

export class MockedLoginUseCase implements ILoginUseCase {
  run(): Promise<Either<ILoginErrors, ILoginOutput>> {
    throw new Error('Method not implemented.')
  }
}

export class MockedCreateUserUseCase implements ICreateUserUseCase {
  run(): Promise<Either<ICreateUserErrors, ICreateUserOutput>> {
    throw new Error('Method not implemented.')
  }
}
