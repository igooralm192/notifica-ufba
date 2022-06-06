import { IPostMessageUseCase } from '@notifica-ufba/domain/usecases'

import { MissingParamsError } from '@/application/errors'
import { BaseController } from '@/application/helpers'
import { IListParamsParser } from '@/application/protocols'
import {
  AuthenticateUserError,
  DisciplineGroupDoesNotExistError,
} from '@notifica-ufba/domain/errors'
import { IValidation } from '@/validation/protocols'

export namespace IPostMessageController {
  export type Body = {
    message?: string
  }

  export type Params = {
    disciplineGroupId?: string
  }

  export type Request = BaseController.Request<Body, any, Params>
}

export class PostMessageController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly postMessageUseCase: IPostMessageUseCase,
  ) {
    super()
  }

  async handle(
    request: IPostMessageController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId
    const disciplineGroupId = request.params?.disciplineGroupId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    if (!disciplineGroupId) {
      return this.badRequest(new MissingParamsError())
    }

    const validationError = this.validation.validate(request.body)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.postMessageUseCase.run({
      userId,
      disciplineGroupId,
      message: request.body!.message!,
    })

    if (result.isRight()) {
      return this.noContent()
    }

    switch (result.value.constructor) {
      case DisciplineGroupDoesNotExistError:
      case AuthenticateUserError.UserDoesNotExistError:
        return this.notFound(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
