import { IDisciplineGroup } from '@notifica-ufba/domain/entities'

export namespace IFindOneDisciplineGroupRepository {
  export type Input = {
    id?: string
    code?: string
  }
  export type Output = IDisciplineGroup | null
}

export interface IFindOneDisciplineGroupRepository {
  findOne(
    input: IFindOneDisciplineGroupRepository.Input,
  ): Promise<IFindOneDisciplineGroupRepository.Output>
}

export namespace IPushStudentDisciplineGroupRepository {
  export type Input = {
    disciplineGroupId: string
    studentId: string
  }
  export type Output = IDisciplineGroup
}

export interface IPushStudentDisciplineGroupRepository {
  pushStudent(
    input: IPushStudentDisciplineGroupRepository.Input,
  ): Promise<IPushStudentDisciplineGroupRepository.Output>
}
