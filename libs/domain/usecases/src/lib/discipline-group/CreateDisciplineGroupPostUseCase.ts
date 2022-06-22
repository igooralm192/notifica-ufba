import { IDisciplineGroupPost } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace ICreateDisciplineGroupPostUseCase {
  export type Input = {
    userId: string
    disciplineGroupId: string
    title?: string
    content: string
  }

  export type Output = IDisciplineGroupPost
}

export type ICreateDisciplineGroupPostUseCase = UseCase<
  ICreateDisciplineGroupPostUseCase.Input,
  Either<BaseError, ICreateDisciplineGroupPostUseCase.Output>
>
