import { IFindAllDisciplineRepository } from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

export class PrismaDisciplineRepository
  extends PrismaRepository
  implements IFindAllDisciplineRepository
{
  async findAll(
    input: IFindAllDisciplineRepository.Input = {},
  ): Promise<IFindAllDisciplineRepository.Output> {
    const { take, skip } = input

    const disciplines = await this.client.discipline.findMany({ take, skip })

    return disciplines
  }
}
