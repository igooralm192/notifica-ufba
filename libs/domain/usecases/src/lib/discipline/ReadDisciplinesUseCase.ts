import { IPaginateListInputDTO } from '@notifica-ufba/domain/dtos'
import { IDiscipline } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IReadDisciplinesUseCase {
  export type Input = {
    paginate?: IPaginateListInputDTO
  }

  export type Output = {
    results: IDiscipline[]
    total: number
  }
}

export type IReadDisciplinesUseCase = UseCase<
  IReadDisciplinesUseCase.Input,
  Either<BaseError, IReadDisciplinesUseCase.Output>
>
