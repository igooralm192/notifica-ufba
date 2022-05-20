import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace ISubscribeStudentToDisciplineGroupUseCase {
  export type Input = {
    disciplineGroupId: string
    studentId: string
  }

  export type Output = void
}

export type ISubscribeStudentToDisciplineGroupUseCase = UseCase<
  ISubscribeStudentToDisciplineGroupUseCase.Input,
  Either<BaseError, ISubscribeStudentToDisciplineGroupUseCase.Output>
>
