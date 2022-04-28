import { ICreateStudentUseCase, CreateStudentUseCase } from '@/domain/usecases'
import { makeHttpApi } from '@/main/factories/api'

export const makeCreateStudentUseCase = (): ICreateStudentUseCase => {
  const httpApi = makeHttpApi()

  return new CreateStudentUseCase(httpApi)
}
