import {
  GenerateHashCryptography,
  IGenerateHashCryptography,
  CompareHashCryptography,
  ICompareHashCryptography,
} from '@/data/protocols/cryptography'

import bcrypt from 'bcryptjs'

export class BcryptHashCryptography
  implements IGenerateHashCryptography, ICompareHashCryptography
{
  constructor(public readonly SALT = 10) {}

  generate({
    payload,
  }: GenerateHashCryptography.Params): Promise<GenerateHashCryptography.Result> {
    return bcrypt.hash(payload, this.SALT)
  }

  compare({
    payload,
    hashed,
  }: CompareHashCryptography.Params): Promise<CompareHashCryptography.Result> {
    return bcrypt.compare(payload, hashed)
  }
}
