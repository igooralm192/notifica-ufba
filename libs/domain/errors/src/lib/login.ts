export class UserDoesNotExistError extends Error {
  constructor() {
    super('Usuário não encontrado.')
    this.name = 'UserDoesNotExistError'
  }
}

export class WrongPasswordError extends Error {
  constructor() {
    super('Senha incorreta.')
    this.name = 'WrongPasswordError'
  }
}
