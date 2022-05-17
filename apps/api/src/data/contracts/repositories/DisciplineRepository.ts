import { IDiscipline } from '@notifica-ufba/domain/entities'
import { RepositoryListInput } from './types'

export namespace ICountDisciplineRepository {
  export type Input = RepositoryListInput
  export type Output = number
}

export interface ICountDisciplineRepository {
  count(
    input?: ICountDisciplineRepository.Input,
  ): Promise<ICountDisciplineRepository.Output>
}

export namespace IFindAllDisciplineRepository {
  export type Input = RepositoryListInput
  export type Output = IDiscipline[]
}

export interface IFindAllDisciplineRepository {
  findAll(
    input?: IFindAllDisciplineRepository.Input,
  ): Promise<IFindAllDisciplineRepository.Output>
}
