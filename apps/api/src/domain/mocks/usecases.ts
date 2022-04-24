import { Either } from '@notifica-ufba/utils'

import {
  ICreateStudentOutput,
  ICreateUserOutput,
  ILoginOutput,
} from '@/domain/ports/outputs'
import {
  ICreateStudentErrors,
  ICreateStudentUseCase,
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

export class MockedCreateStudentUseCase implements ICreateStudentUseCase {
  run(): Promise<Either<ICreateStudentErrors, ICreateStudentOutput>> {
    throw new Error('Method not implemented.')
  }
}
