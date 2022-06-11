import { IReadDisciplineGroupsUseCase } from '@notifica-ufba/domain/usecases'

import { BaseController } from '@/application/helpers'
import { DisciplineGroupMapper } from '@/application/mappers'
import { IListParamsParser } from '@/application/protocols'
import { MissingParamsError } from '@/application/errors'

export namespace IReadMyDisciplineGroupsController {
  export type Request = BaseController.Request
}

export class ReadMyDisciplineGroupsController extends BaseController {
  constructor(
    private readonly listParamsParser: IListParamsParser,
    private readonly readDisciplineGroupsUseCase: IReadDisciplineGroupsUseCase,
  ) {
    super()
  }

  async handle(
    request: BaseController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    const listParams = this.listParamsParser.parse(request.query)

    const result = await this.readDisciplineGroupsUseCase.run({
      userId,
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
