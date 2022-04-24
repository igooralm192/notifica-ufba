import { StudentEntity } from '@/domain/entities'

export namespace IFindOneStudentRepository {
  export type Input = {
    matriculation?: string
  }
}

export interface IFindOneStudentRepository {
  findOne(input: IFindOneStudentRepository.Input): Promise<StudentEntity | null>
}

export namespace ICreateStudentRepository {
  export type Input = {
    matriculation: string
    course: string
    userId: string
  }
}

export interface ICreateStudentRepository {
  create(input: ICreateStudentRepository.Input): Promise<StudentEntity>
}
