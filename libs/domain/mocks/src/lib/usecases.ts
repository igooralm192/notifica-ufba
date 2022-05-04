import {
  IAuthenticateUserUseCase,
  ICreateStudentUseCase,
  ICreateUserUseCase,
} from '@notifica-ufba/domain/usecases'
import { Either } from '@notifica-ufba/utils'

export class MockedAuthenticateUserUseCase implements IAuthenticateUserUseCase {
  run(): Promise<
    Either<IAuthenticateUserUseCase.Errors, IAuthenticateUserUseCase.Output>
  > {
    throw new Error('Method not implemented.')
  }
}

export class MockedCreateStudentUseCase implements ICreateStudentUseCase {
  run(): Promise<
    Either<ICreateStudentUseCase.Errors, ICreateStudentUseCase.Output>
  > {
    throw new Error('Method not implemented.')
  }
}

export class MockedCreateUserUseCase implements ICreateUserUseCase {
  run(): Promise<Either<ICreateUserUseCase.Errors, ICreateUserUseCase.Output>> {
    throw new Error('Method not implemented.')
  }
}
