export namespace GenerateHashCryptography {
  export type Params = {
    payload: string
  }

  export type Result = string
}

export interface IGenerateHashCryptography {
  generate(
    params: GenerateHashCryptography.Params,
  ): Promise<GenerateHashCryptography.Result>
}

export namespace CompareHashCryptography {
  export type Params = {
    payload: string
    hashed: string
  }

  export type Result = boolean
}

export interface ICompareHashCryptography {
  compare(
    params: CompareHashCryptography.Params,
  ): Promise<CompareHashCryptography.Result>
}
