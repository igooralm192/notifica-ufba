import {
  IAuthenticateUserUseCase,
  ICreateStudentUseCase,
  ICreateUserUseCase,
  IGetUserByIdUseCase,
  IGetUserIdByTokenUseCase,
  IReadDisciplinesUseCase,
  ISubscribeStudentToDisciplineGroupUseCase,
} from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either } from '@notifica-ufba/utils'

export class MockedAuthenticateUserUseCase implements IAuthenticateUserUseCase {
  run(): Promise<Either<BaseError, IAuthenticateUserUseCase.Output>> {
    throw new Error('Method not implemented.')
  }
}

export class MockedCreateStudentUseCase implements ICreateStudentUseCase {
  run(): Promise<Either<BaseError, ICreateStudentUseCase.Output>> {
    throw new Error('Method not implemented.')
  }
}

export class MockedCreateUserUseCase implements ICreateUserUseCase {
  run(): Promise<Either<BaseError, ICreateUserUseCase.Output>> {
    throw new Error('Method not implemented.')
  }
}

export class MockedGetUserByIdUseCase implements IGetUserByIdUseCase {
  run(): Promise<Either<BaseError, IGetUserByIdUseCase.Output>> {
    throw new Error('Method not implemented.')
  }
}

export class MockedGetUserIdByTokenUseCase implements IGetUserIdByTokenUseCase {
  run(): Promise<Either<BaseError, IGetUserIdByTokenUseCase.Output>> {
    throw new Error('Method not implemented.')
  }
}

export class MockedReadDisciplinesUseCase implements IReadDisciplinesUseCase {
  run(): Promise<Either<BaseError, IReadDisciplinesUseCase.Output>> {
    throw new Error('Method not implemented.')
  }
}

export class MockedSubscribeStudentToDisciplineGroupUseCase
  implements ISubscribeStudentToDisciplineGroupUseCase
{
  run(): Promise<
    Either<BaseError, ISubscribeStudentToDisciplineGroupUseCase.Output>
  > {
    throw new Error('Method not implemented.')
  }
}
