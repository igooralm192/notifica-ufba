import { left, right } from '@notifica-ufba/utils'
import { CryptographyError } from '@/data/errors'
import {
  GenerateTokenCryptography,
  IGenerateTokenCryptography,
  DecodeTokenCryptography,
  IDecodeTokenCryptography,
} from '@/data/protocols/cryptography'

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
  ): DecodeTokenCryptography.Errors {
    switch (error?.name as string) {
      case 'TokenExpiredError':
        return new CryptographyError.ExpiredTokenError()
      default:
        return new CryptographyError.InvalidTokenError()
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
