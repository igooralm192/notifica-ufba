import { ReadMyDisciplineGroupsController } from '@/application/controllers/discipline-group'
import { makeListParamsParser } from '@/main/factories/parsers'
import { makeReadDisciplineGroupsUseCase } from '@/main/factories/usecases'

export const makeReadMyDisciplineGroupsController = () => {
  const listParamsParser = makeListParamsParser()
  const readDisciplineGroupsUseCase = makeReadDisciplineGroupsUseCase()

  return new ReadMyDisciplineGroupsController(
    listParamsParser,
    readDisciplineGroupsUseCase,
  )
}
