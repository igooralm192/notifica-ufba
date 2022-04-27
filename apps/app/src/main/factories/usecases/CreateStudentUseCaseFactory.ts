import { ICreateStudentUseCase, CreateStudentUseCase } from '@/domain/usecases'
import { makeHttpClient } from '@/main/factories/http'

export const makeCreateStudentUseCase = (): ICreateStudentUseCase => {
  const httpClient = makeHttpClient()

  return new CreateStudentUseCase(httpClient)
}
