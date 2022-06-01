import { IStudent } from '@notifica-ufba/domain/entities'

export namespace ICreateStudentRepository {
  export type Input = {
    matriculation: string
    course: string
    userId: string
  }

  export type Output = IStudent
}

export interface ICreateStudentRepository {
  create(
    input: ICreateStudentRepository.Input,
  ): Promise<ICreateStudentRepository.Output>
}

export namespace IFindOneStudentRepository {
  export type Input = {
    id?: string
    matriculation?: string
    userId?: string
  }

  export type Output = IStudent | null
}

export interface IFindOneStudentRepository {
  findOne(
    input: IFindOneStudentRepository.Input,
  ): Promise<IFindOneStudentRepository.Output>
}
