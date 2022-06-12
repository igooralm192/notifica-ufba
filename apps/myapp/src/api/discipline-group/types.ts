import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { ILastMessageDTO } from '@notifica-ufba/domain/usecases'

export namespace IGetDisciplineGroupsEndpoint {
  export interface Request {
    query?: {
      studentId?: string
    }
    page?: number
    limit?: number
  }

  export interface Response {
    results: IDisciplineGroup[]
    total: number
  }
}

export namespace IGetMyLastMessagesEndpoint {
  export interface Request {
    page: number
    limit: number
  }

  export interface Response {
    results: ILastMessageDTO[]
    total: number
  }
}

export namespace ISubscribeStudentEndpoint {
  export interface Request {
    disciplineGroupId: string
    studentId: string
  }
}
