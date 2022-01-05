import {
  IGenerateHashCryptography,
  ICompareHashCryptography,
  IGenerateTokenCryptography,
  IDecodeTokenCryptography,
} from '@/data/protocols/cryptography'

export class MockedHashCryptography
  implements IGenerateHashCryptography, ICompareHashCryptography
{
  generate(): Promise<string> {
    throw new Error('Method not implemented.')
  }

  compare(): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

export class MockedTokenCryptography
  implements IGenerateTokenCryptography, IDecodeTokenCryptography
{
  generate(): Promise<string> {
    throw new Error('Method not implemented.')
  }

  decode<T = any>(): Promise<T> {
    throw new Error('Method not implemented.')
  }
}
