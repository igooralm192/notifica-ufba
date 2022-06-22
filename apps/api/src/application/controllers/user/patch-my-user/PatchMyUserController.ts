import { AuthenticateUserError } from '@notifica-ufba/domain/errors'
import { IUpdateUserUseCase } from '@notifica-ufba/domain/usecases'

import { BaseController } from '@/application/helpers'
import { UserMapper } from '@/application/mappers'
import { IValidation } from '@/validation/protocols'

export namespace IPatchMyUserController {
  export type Body = {
    pushToken?: string
  }

  export type Request = BaseController.Request<Body>
}

export class PatchMyUserController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateUserUseCase: IUpdateUserUseCase,
  ) {
    super()
  }

  async handle(
    request: IPatchMyUserController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    const validationError = this.validation.validate(request.body)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.updateUserUseCase.run({
      id: { userId },
      data: request.body!,
    })

    if (result.isRight()) {
      return this.ok({ user: UserMapper.toDTO(result.value.user) })
    }

    switch (result.value.constructor) {
      case AuthenticateUserError.UserDoesNotExistError:
        return this.notFound(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
