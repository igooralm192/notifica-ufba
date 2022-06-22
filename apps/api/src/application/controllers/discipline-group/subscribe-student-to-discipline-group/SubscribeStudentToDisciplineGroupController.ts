import {
  DisciplineGroupDoesNotExistError,
  StudentAlreadySubscribedError,
  StudentDoesNotExistError,
} from '@notifica-ufba/domain/errors'
import { ISubscribeStudentToDisciplineGroupUseCase } from '@notifica-ufba/domain/usecases'

import { MissingParamsError } from '@/application/errors'
import { BaseController } from '@/application/helpers'
import { DisciplineGroupMapper } from '@/application/mappers'

export namespace ISubscribeStudentToDisciplineGroupController {
  export type Params = {
    disciplineGroupId?: string
  }

  export type Request = BaseController.Request<Body, any, Params>
}

export class SubscribeStudentToDisciplineGroupController extends BaseController {
  constructor(
    private readonly subscribeStudentToDisciplineGroupUseCase: ISubscribeStudentToDisciplineGroupUseCase,
  ) {
    super()
  }

  async handle(
    request: ISubscribeStudentToDisciplineGroupController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId
    const disciplineGroupId = request.params?.disciplineGroupId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    if (!disciplineGroupId) {
      return this.badRequest(new MissingParamsError())
    }

    const result = await this.subscribeStudentToDisciplineGroupUseCase.run({
      userId,
      disciplineGroupId,
    })

    if (result.isRight()) {
      return this.ok({
        disciplineGroup: DisciplineGroupMapper.toDTO(
          result.value.disciplineGroup,
        ),
      })
    }

    switch (result.value.constructor) {
      case DisciplineGroupDoesNotExistError:
      case StudentDoesNotExistError:
        return this.notFound(result.value)

      case StudentAlreadySubscribedError:
        return this.unprocessable(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
