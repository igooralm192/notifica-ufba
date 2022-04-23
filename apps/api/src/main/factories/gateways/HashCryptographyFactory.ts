import {
  ICompareHashCryptography,
  IGenerateHashCryptography,
} from '@/domain/ports/gateways'
import { BcryptHashCryptography } from '@/infra/cryptography/bcrypt'

type IHashCryptography = IGenerateHashCryptography & ICompareHashCryptography

export const makeHashCryptography = (): IHashCryptography => {
  return new BcryptHashCryptography()
}
