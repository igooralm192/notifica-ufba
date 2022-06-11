import { IPaginateListInputDTO } from '@notifica-ufba/domain/dtos'
import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IReadDisciplineGroupsUseCase {
  export type Input = {
    userId: string
    listInput: {
      paginate?: IPaginateListInputDTO
    }
  }

  export type Output = {
    results: IDisciplineGroup[]
    total: number
  }
}

export type IReadDisciplineGroupsUseCase = UseCase<
  IReadDisciplineGroupsUseCase.Input,
  Either<BaseError, IReadDisciplineGroupsUseCase.Output>
>
