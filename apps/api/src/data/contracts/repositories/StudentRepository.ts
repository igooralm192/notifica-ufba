import { IStudentEntity } from '@notifica-ufba/domain/entities'

export namespace ICreateStudentRepository {
  export type Input = {
    matriculation: string
    course: string
    userId: string
  }

  export type Output = IStudentEntity
}

export interface ICreateStudentRepository {
  create(
    input: ICreateStudentRepository.Input,
  ): Promise<ICreateStudentRepository.Output>
}

export namespace IFindOneStudentRepository {
  export type Input = {
    matriculation?: string
  }

  export type Output = IStudentEntity | null
}

export interface IFindOneStudentRepository {
  findOne(
    input: IFindOneStudentRepository.Input,
  ): Promise<IFindOneStudentRepository.Output>
}
