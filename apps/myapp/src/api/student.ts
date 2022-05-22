import { ICreateStudentUseCase } from '@notifica-ufba/domain/usecases'
import { StudentMapper } from '@/mappers'
import { api } from '@/services/api'

export const createStudent = async ({
  name,
  email,
  password,
  matriculation,
  course,
}: ICreateStudentUseCase.Input): Promise<ICreateStudentUseCase.Output> => {
  const response = await api.post('/students', {
    name,
    email,
    password,
    matriculation,
    course,
  })

  const { student } = response.data

  return {
    student: StudentMapper.toEntity(student),
  }
}
