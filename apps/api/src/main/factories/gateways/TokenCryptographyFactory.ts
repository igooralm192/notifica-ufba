import {
  IDecodeTokenCryptography,
  IGenerateTokenCryptography,
} from '@/domain/ports/gateways'
import { JwtTokenCryptography } from '@/infra/cryptography/jwt'

type ITokenCryptography = IGenerateTokenCryptography & IDecodeTokenCryptography

export const makeTokenCryptography = (): ITokenCryptography => {
  return new JwtTokenCryptography()
}
