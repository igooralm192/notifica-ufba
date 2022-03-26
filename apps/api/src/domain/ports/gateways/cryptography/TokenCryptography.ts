import { Either } from '@notifica-ufba/utils'
import { CryptographyError } from '@/domain/errors'

export namespace IGenerateTokenCryptography {
  export type Input = {
    payload: any
  }

  export type Output = string
}

export interface IGenerateTokenCryptography {
  generate(
    Input: IGenerateTokenCryptography.Input,
  ): Promise<IGenerateTokenCryptography.Output>
}

export namespace IDecodeTokenCryptography {
  export type Input = {
    token: string
  }

  export type Errors =
    | CryptographyError.InvalidTokenError
    | CryptographyError.ExpiredTokenError

  export type Output<T = any> = Either<Errors, T>
}

export interface IDecodeTokenCryptography {
  decode(
    Input: IDecodeTokenCryptography.Input,
  ): Promise<IDecodeTokenCryptography.Output>
}
