import {
  DisciplineGroupDoesNotExistError,
  StudentDoesNotExistError,
} from '@notifica-ufba/domain/errors'
import { ISubscribeStudentToDisciplineGroupUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import {
  IFindOneDisciplineGroupRepository,
  IFindOneStudentRepository,
  IPushStudentDisciplineGroupRepository,
} from '@/data/contracts'

export class SubscribeStudentToDisciplineGroupUseCase
  implements ISubscribeStudentToDisciplineGroupUseCase
{
  constructor(
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly findOneStudentRepository: IFindOneStudentRepository,
    private readonly pushStudentDisciplineGroupRepository: IPushStudentDisciplineGroupRepository,
  ) {}

  async run({
    disciplineGroupId,
    studentId,
  }: ISubscribeStudentToDisciplineGroupUseCase.Input): Promise<
    Either<BaseError, ISubscribeStudentToDisciplineGroupUseCase.Output>
  > {
    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      { id: disciplineGroupId },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    const student = await this.findOneStudentRepository.findOne({
      id: studentId,
    })

    if (!student) {
      return left(new StudentDoesNotExistError())
    }

    await this.pushStudentDisciplineGroupRepository.pushStudent({
      disciplineGroupId,
      studentId,
    })

    return right(undefined)
  }
}
