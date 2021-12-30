import { left, right } from '@notifica-ufba/utils'
import {
  GenerateTokenCryptography,
  DecodeTokenCryptography,
} from '@/data/protocols/cryptography'

import {
  InvalidJwtTokenError,
  ExpiredJwtTokenError,
} from '@/infra/cryptography/jwt/errors'

import jwt from 'jsonwebtoken'

export class JwtTokenCryptography
  implements GenerateTokenCryptography, DecodeTokenCryptography
{
  private EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

  constructor(
    private readonly SECRET_KEY = process.env.JWT_SECRET_KEY || 'MY_SECRET',
  ) {}

  private resolveDecodeTokenJwtError(
    error: any,
  ): DecodeTokenCryptography.Errors {
    switch (error?.name as string) {
      case 'TokenExpiredError':
        return new ExpiredJwtTokenError()
      default:
        return new InvalidJwtTokenError()
    }
  }

  async generate({
    payload,
  }: GenerateTokenCryptography.Params): Promise<GenerateTokenCryptography.Result> {
    return jwt.sign(payload, this.SECRET_KEY, { expiresIn: this.EXPIRES_IN })
  }

  async decode<T = any>({
    token,
  }: DecodeTokenCryptography.Params): Promise<DecodeTokenCryptography.Result> {
    try {
      return right(jwt.verify(token, this.SECRET_KEY) as T)
    } catch (error) {
      return left(this.resolveDecodeTokenJwtError(error))
    }
  }
}
