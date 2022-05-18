import {
  IDiscipline,
  IDisciplineGroup,
  ITeacher,
  IUser,
} from '@notifica-ufba/domain/entities'

export type IUserRepositoryListInput = {
  where?: any
  take?: number
  skip?: number
  select?: {
    [key in keyof IUser]?: boolean
  }
}

export type ITeacherRepositoryListInput = {
  where?: any
  take?: number
  skip?: number
  select?: {
    [key in keyof ITeacher]?: boolean
  }
  include?: {
    user: boolean | IUserRepositoryListInput
  }
}

export type IDisciplineGroupRepositoryListInput = {
  where?: any
  take?: number
  skip?: number
  select?: {
    [key in keyof IDisciplineGroup]?: boolean
  }
  include?: {
    teacher: boolean | ITeacherRepositoryListInput
  }
}

export type IDisciplineRepositoryListInput = {
  where?: any
  take?: number
  skip?: number
  select?: {
    [key in keyof IDiscipline]?: boolean
  }
  include?: {
    groups: boolean | IDisciplineGroupRepositoryListInput
  }
}

export namespace ICountDisciplineRepository {
  export type Input = IDisciplineRepositoryListInput
  export type Output = number
}

export interface ICountDisciplineRepository {
  count(
    input?: ICountDisciplineRepository.Input,
  ): Promise<ICountDisciplineRepository.Output>
}

export namespace IFindAllDisciplineRepository {
  export type Input = IDisciplineRepositoryListInput
  export type Output = IDiscipline[]
}

export interface IFindAllDisciplineRepository {
  findAll(
    input?: IFindAllDisciplineRepository.Input,
  ): Promise<IFindAllDisciplineRepository.Output>
}
