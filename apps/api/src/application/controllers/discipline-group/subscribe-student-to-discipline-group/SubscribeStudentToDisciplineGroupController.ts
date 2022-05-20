import {
  DisciplineGroupDoesNotExistError,
  StudentDoesNotExistError,
} from '@notifica-ufba/domain/errors'
import { ISubscribeStudentToDisciplineGroupUseCase } from '@notifica-ufba/domain/usecases'

import { MissingParamsError } from '@/application/errors'
import { BaseController } from '@/application/helpers'
import { IValidation } from '@/validation/protocols'

export namespace ISubscribeStudentToDisciplineGroupController {
  export type Body = {
    studentId?: string
  }

  export type Params = {
    disciplineGroupId?: string
  }

  export type Request = BaseController.Request<Body, any, Params>
}

export class SubscribeStudentToDisciplineGroupController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly subscribeStudentToDisciplineGroupUseCase: ISubscribeStudentToDisciplineGroupUseCase,
  ) {
    super()
  }

  async handle(
    request: ISubscribeStudentToDisciplineGroupController.Request,
  ): Promise<BaseController.Response> {
    const disciplineGroupId = request.params?.disciplineGroupId

    if (!disciplineGroupId) {
      return this.badRequest(new MissingParamsError())
    }

    const validationError = this.validation.validate(request.body)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const studentId = request.body?.studentId

    const result = await this.subscribeStudentToDisciplineGroupUseCase.run({
      disciplineGroupId,
      studentId: studentId!,
    })

    if (result.isRight()) {
      return this.noContent()
    }

    switch (result.value.constructor) {
      case DisciplineGroupDoesNotExistError:
      case StudentDoesNotExistError:
        return this.notFound(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
