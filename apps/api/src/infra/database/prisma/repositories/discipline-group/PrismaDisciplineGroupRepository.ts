import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import {
  IFindOneDisciplineGroupRepository,
  IPushStudentDisciplineGroupRepository,
} from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

import { DisciplineGroup } from '@prisma/client'

export class PrismaDisciplineGroupRepository
  extends PrismaRepository
  implements
    IFindOneDisciplineGroupRepository,
    IPushStudentDisciplineGroupRepository
{
  async findOne(
    input: IFindOneDisciplineGroupRepository.Input,
  ): Promise<IFindOneDisciplineGroupRepository.Output> {
    const disciplineGroup = await this.client.disciplineGroup
      .findFirst({
        where: input,
      })
      .catch(() => null)

    if (!disciplineGroup) return null

    return this.parseDisciplineGroup(disciplineGroup)
  }

  async pushStudent({
    disciplineGroupId,
    studentId,
  }: IPushStudentDisciplineGroupRepository.Input): Promise<IPushStudentDisciplineGroupRepository.Output> {
    const disciplineGroup = await this.client.disciplineGroup.update({
      data: {
        studentIds: { push: studentId },
      },
      where: { id: disciplineGroupId },
    })

    return this.parseDisciplineGroup(disciplineGroup)
  }

  private parseDisciplineGroup(
    disciplineGroup: DisciplineGroup,
  ): IDisciplineGroup {
    return {
      ...disciplineGroup,
      teacherId: disciplineGroup.teacherId ?? undefined,
      disciplineId: disciplineGroup.disciplineId ?? undefined,
    }
  }
}
