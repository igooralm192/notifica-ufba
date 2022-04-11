import { left, right } from '@notifica-ufba/utils'

import { CryptographyError } from '@/domain/errors'
import {
  IGenerateTokenCryptography,
  IDecodeTokenCryptography,
} from '@/domain/ports/gateways/cryptography'

import jwt from 'jsonwebtoken'

export class JwtTokenCryptography
  implements IGenerateTokenCryptography, IDecodeTokenCryptography
{
  private EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

  constructor(
    private readonly SECRET_KEY = process.env.JWT_SECRET_KEY || 'MY_SECRET',
  ) {}

  private resolveDecodeTokenJwtError(
    error: any,
  ): IDecodeTokenCryptography.Errors {
    switch (error?.name as string) {
      case 'TokenExpiredError':
        return new CryptographyError.ExpiredTokenError()
      default:
        return new CryptographyError.InvalidTokenError()
    }
  }

  async generate({
    payload,
  }: IGenerateTokenCryptography.Input): Promise<IGenerateTokenCryptography.Output> {
    return jwt.sign(payload, this.SECRET_KEY, { expiresIn: this.EXPIRES_IN })
  }

  async decode<T = any>({
    token,
  }: IDecodeTokenCryptography.Input): Promise<IDecodeTokenCryptography.Output> {
    try {
      return right(jwt.verify(token, this.SECRET_KEY) as T)
    } catch (error) {
      return left(this.resolveDecodeTokenJwtError(error))
    }
  }
}