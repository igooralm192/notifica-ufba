import { Either } from '@notifica-ufba/utils'

import { ICreateStudentInput } from '@/domain/ports/inputs'
import { ILoginOutput } from '@/domain/ports/outputs'
import { ILoginErrors } from '@/domain/usecases'

export interface IRegisterFormValues {
  name: string
  email: string
  matriculation: string
  course: string
  password: string
  confirmPassword: string
}

export interface IRegisterPresenter {
  loading: boolean
  register(
    input: ICreateStudentInput,
  ): Promise<Either<ILoginErrors, ILoginOutput>>
}
