import {
  IDisciplineDTO,
  IPaginateListInputDTO,
} from '@notifica-ufba/domain/dtos'
import { CommonError } from '@notifica-ufba/domain/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export namespace IReadDisciplinesUseCase {
  export type Input = {
    paginate?: IPaginateListInputDTO
  }

  export type Errors = CommonError.InternalServerError

  export type Output = {
    disciplines: IDisciplineDTO[]
    total: number
  }
}

export type IReadDisciplinesUseCase = UseCase<
  IReadDisciplinesUseCase.Input,
  Either<IReadDisciplinesUseCase.Errors, IReadDisciplinesUseCase.Output>
>
