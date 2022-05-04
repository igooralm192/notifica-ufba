import { ICreateStudentUseCase } from '@notifica-ufba/domain/usecases'

import { CreateStudentUseCase } from '@/data/usecases/student'
import { makeHttpApi } from '@/main/factories/api'

export const makeCreateStudentUseCase = (): ICreateStudentUseCase => {
  const httpApi = makeHttpApi()

  return new CreateStudentUseCase(httpApi)
}
