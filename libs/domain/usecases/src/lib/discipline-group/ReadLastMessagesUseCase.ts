import { IPaginateListInputDTO } from '@notifica-ufba/domain/dtos'
import { BaseError } from '@notifica-ufba/errors'
import { Either, UseCase } from '@notifica-ufba/utils'

export interface ILastMessageDTO {
  disciplineGroupId: string
  disciplineGroupCode: string
  disciplineName: string
  disciplineCode: string
  message: string
  sentBy: string
  sentAt: Date
}

export namespace IReadLastMessagesUseCase {
  export type Input = {
    userId: string
    listInput: {
      paginate?: IPaginateListInputDTO
    }
  }

  export type Output = {
    results: ILastMessageDTO[]
    total: number
  }
}

export type IReadLastMessagesUseCase = UseCase<
  IReadLastMessagesUseCase.Input,
  Either<BaseError, IReadLastMessagesUseCase.Output>
>
