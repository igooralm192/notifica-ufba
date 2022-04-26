import { Either } from '@notifica-ufba/utils'

import { ILoginInput } from '@/domain/ports/inputs'
import { ILoginOutput } from '@/domain/ports/outputs'
import { ILoginErrors } from '@/domain/usecases'

export interface ILoginFormValues {
  email: string
  password: string
}

export interface ILoginPresenter {
  loading: boolean
  login(input: ILoginInput): Promise<Either<ILoginErrors, ILoginOutput>>
}
