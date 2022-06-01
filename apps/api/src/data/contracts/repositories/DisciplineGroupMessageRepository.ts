import { IDisciplineGroupMessage } from '@notifica-ufba/domain/entities'

export type IDisciplineGroupMessageRepositoryListInput = {
  where?: any
  take?: number
  skip?: number
  orderBy?: {
    [key in keyof IDisciplineGroupMessage]?: 'asc' | 'desc'
  }
}

export namespace IFindAllDisciplineGroupMessageRepository {
  export type Input = IDisciplineGroupMessageRepositoryListInput
  export type Output = {
    results: IDisciplineGroupMessage[]
    total: number
  }
}

export interface IFindAllDisciplineGroupMessageRepository {
  findAll(
    input: IFindAllDisciplineGroupMessageRepository.Input,
  ): Promise<IFindAllDisciplineGroupMessageRepository.Output>
}
