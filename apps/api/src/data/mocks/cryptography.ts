import {
  GenerateHashCryptography,
  CompareHashCryptography,
  GenerateTokenCryptography,
  DecodeTokenCryptography,
} from '@/data/protocols/cryptography'

export class FakeHashCryptography
  implements GenerateHashCryptography, CompareHashCryptography
{
  generate(): Promise<string> {
    throw new Error('Method not implemented.')
  }

  compare(): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

export class FakeTokenCryptography
  implements GenerateTokenCryptography, DecodeTokenCryptography
{
  generate(): Promise<string> {
    throw new Error('Method not implemented.')
  }

  decode<T = any>(): Promise<T> {
    throw new Error('Method not implemented.')
  }
}
