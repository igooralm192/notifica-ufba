import { Either } from '@notifica-ufba/utils'
import { CryptographyError } from '@/data/errors'

export namespace GenerateTokenCryptography {
  export type Params = {
    payload: any
  }

  export type Result = string
}

export interface IGenerateTokenCryptography {
  generate(
    params: GenerateTokenCryptography.Params,
  ): Promise<GenerateTokenCryptography.Result>
}

export namespace DecodeTokenCryptography {
  export type Params = {
    token: string
  }

  export type Errors =
    | CryptographyError.InvalidTokenError
    | CryptographyError.ExpiredTokenError

  export type Result<T = any> = Either<Errors, T>
}

export interface IDecodeTokenCryptography {
  decode(
    params: DecodeTokenCryptography.Params,
  ): Promise<DecodeTokenCryptography.Result>
}
