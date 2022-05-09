import { IDisciplineEntity } from '@notifica-ufba/domain/entities'
import { FindAllRepositoryInput } from './types'

export namespace IFindAllDisciplineRepository {
  export type Input = FindAllRepositoryInput | undefined
  export type Output = IDisciplineEntity[]
}

export interface IFindAllDisciplineRepository {
  findAll(
    input?: IFindAllDisciplineRepository.Input,
  ): Promise<IFindAllDisciplineRepository.Output>
}
