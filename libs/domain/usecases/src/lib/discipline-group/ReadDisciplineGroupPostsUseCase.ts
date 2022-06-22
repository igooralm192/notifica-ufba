import { IPaginateListInputDTO } from '@notifica-ufba/domain/dtos'
import { IDisciplineGroupPost } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IReadDisciplineGroupPostsUseCase {
  export type Input = {
    disciplineGroupId: string
    listInput: {
      paginate?: IPaginateListInputDTO
    }
  }

  export type Output = {
    results: IDisciplineGroupPost[]
    total: number
  }
}

export type IReadDisciplineGroupPostsUseCase = UseCase<
  IReadDisciplineGroupPostsUseCase.Input,
  Either<BaseError, IReadDisciplineGroupPostsUseCase.Output>
>
