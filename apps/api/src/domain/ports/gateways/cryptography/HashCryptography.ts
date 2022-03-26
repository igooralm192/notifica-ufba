export namespace IGenerateHashCryptography {
  export type Input = {
    payload: string
  }

  export type Output = string
}

export interface IGenerateHashCryptography {
  generate(
    Input: IGenerateHashCryptography.Input,
  ): Promise<IGenerateHashCryptography.Output>
}

export namespace ICompareHashCryptography {
  export type Input = {
    payload: string
    hashed: string
  }

  export type Output = boolean
}

export interface ICompareHashCryptography {
  compare(
    Input: ICompareHashCryptography.Input,
  ): Promise<ICompareHashCryptography.Output>
}
