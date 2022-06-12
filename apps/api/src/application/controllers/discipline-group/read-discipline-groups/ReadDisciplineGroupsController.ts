import { IReadDisciplineGroupsUseCase } from '@notifica-ufba/domain/usecases'

import { BaseController } from '@/application/helpers'
import { DisciplineGroupMapper } from '@/application/mappers'
import { IListParamsParser } from '@/application/protocols'
import { MissingParamsError } from '@/application/errors'
import { IDisciplineGroup } from '@notifica-ufba/domain/entities'

export namespace IReadDisciplineGroupsController {
  export type Request = BaseController.Request
}

export class ReadDisciplineGroupsController extends BaseController {
  constructor(
    private readonly listParamsParser: IListParamsParser<IDisciplineGroup>,
    private readonly readDisciplineGroupsUseCase: IReadDisciplineGroupsUseCase,
  ) {
    super()
  }

  async handle(
    request: IReadDisciplineGroupsController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    const listParams = this.listParamsParser.parse(request.query)

    const result = await this.readDisciplineGroupsUseCase.run({
      listInput: listParams,
    })

    if (result.isLeft()) {
      return this.fail(result.value)
    }

    const { results, total } = result.value

    return this.ok({
      results: results.map(disciplineGroup =>
        DisciplineGroupMapper.toDTO(disciplineGroup),
      ),
      total,
    })
  }
}
