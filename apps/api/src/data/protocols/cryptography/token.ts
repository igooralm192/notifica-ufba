import { Either } from '@notifica-ufba/utils'
import * as JwtTokenErrors from '@/infra/cryptography/jwt/errors'

export namespace GenerateTokenCryptography {
  export type Params = {
    payload: any
  }

  export type Result = string
}

export interface GenerateTokenCryptography {
  generate(
    params: GenerateTokenCryptography.Params,
  ): Promise<GenerateTokenCryptography.Result>
}

export namespace DecodeTokenCryptography {
  export type Params = {
    token: string
  }

  export type Errors =
    | JwtTokenErrors.InvalidJwtTokenError
    | JwtTokenErrors.ExpiredJwtTokenError

  export type Result<T = any> = Either<Errors, T>
}

export interface DecodeTokenCryptography {
  decode(
    params: DecodeTokenCryptography.Params,
  ): Promise<DecodeTokenCryptography.Result>
}
