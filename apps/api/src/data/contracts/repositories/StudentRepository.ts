import { IStudent } from '@notifica-ufba/domain/entities'

export type IStudentRepositoryListInput = {
  where?: any
  take?: number
  skip?: number
  select?: {
    [key in keyof IStudent]?: boolean
  }
  include?: {
    user: boolean
  }
}

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

export namespace IFindAllStudentRepository {
  export type Input = IStudentRepositoryListInput
  export type Output = {
    results: IStudent[]
    total: number
  }
}

export interface IFindAllStudentRepository {
  findAll(
    input: IFindAllStudentRepository.Input,
  ): Promise<IFindAllStudentRepository.Output>
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
