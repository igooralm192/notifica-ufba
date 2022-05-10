import { IReadDisciplinesUseCase } from '@notifica-ufba/domain/usecases'

import { BaseController } from '@/application/helpers'
import { DisciplineViewModel } from '@/application/models'
import { IListParamsParser } from '@/application/protocols'

export class ReadDisciplinesController extends BaseController {
  constructor(
    private readonly listParamsParser: IListParamsParser,
    private readonly readDisciplinesUseCase: IReadDisciplinesUseCase,
  ) {
    super()
  }

  async handle(
    request: BaseController.Request,
  ): Promise<BaseController.Response> {
    const listParams = this.listParamsParser.parse(request.query)

    const result = await this.readDisciplinesUseCase.run({ ...listParams })

    if (result.isLeft()) {
      return this.fail(result.value)
    }

    const { disciplines, total } = result.value

    return this.ok({
      results: disciplines.map(discipline =>
        DisciplineViewModel.fromDTO(discipline),
      ),
      total,
    })
  }
}
