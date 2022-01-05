import { BaseError } from './helpers'

export namespace LoginError {
  export class UserDoesNotExistError extends BaseError {
    constructor() {
      super({
        type: 'UserDoesNotExistError',
        message: 'Usuário não encontrado.',
      })
    }
  }

  export class WrongPasswordError extends BaseError {
    constructor() {
      super({
        type: 'WrongPasswordError',
        message: 'Senha incorreta.',
      })
    }
  }
}

export type LoginErrors =
  | LoginError.UserDoesNotExistError
  | LoginError.WrongPasswordError
