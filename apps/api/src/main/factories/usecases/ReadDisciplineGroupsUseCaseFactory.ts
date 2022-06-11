import { IReadDisciplineGroupsUseCase } from '@notifica-ufba/domain/usecases'
import { ReadDisciplineGroupsUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupRepository,
  makeStudentRepository,
} from '@/main/factories/repositories'

export const makeReadDisciplineGroupsUseCase =
  (): IReadDisciplineGroupsUseCase => {
    const studentRepository = makeStudentRepository()
    const disciplineGroupRepository = makeDisciplineGroupRepository()

    return new ReadDisciplineGroupsUseCase(
      studentRepository,
      disciplineGroupRepository,
    )
  }
