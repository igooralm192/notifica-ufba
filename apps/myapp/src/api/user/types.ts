import { IStudent, IUser } from '@notifica-ufba/domain/entities'

export namespace ILoginEndpoint {
  export interface Request {
    email: string
    password: string
  }

  export interface Response {
    token: string
  }
}

export namespace IRegisterEndpoint {
  export interface Request {
    name: string
    email: string
    password: string
    matriculation: string
    course: string
  }

  export interface Response {
    student: IStudent
  }
}

export namespace IGetMyUserEndpoint {
  export interface Response {
    user: IUser
  }
}
