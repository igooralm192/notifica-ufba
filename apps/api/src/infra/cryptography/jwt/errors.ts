export class InvalidJwtTokenError extends Error {
  constructor() {
    super('Token JWT inválido.')
    this.name = 'InvalidJwtTokenError'
  }
}

export class ExpiredJwtTokenError extends Error {
  constructor() {
    super('Token JWT expirado.')
    this.name = 'ExpiredJwtTokenError'
  }
}
