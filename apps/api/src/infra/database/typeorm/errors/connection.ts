export class ConnectionNotFoundError extends Error {
  constructor() {
    super('Conexão com banco não encontrada.')
    this.name = 'ConnectionNotFoundError'
  }
}
