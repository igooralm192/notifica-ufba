export class InternalServerError extends Error {
  constructor() {
    super('Erro interno no servidor.')
    this.name = 'InternalServerError'
  }
}
