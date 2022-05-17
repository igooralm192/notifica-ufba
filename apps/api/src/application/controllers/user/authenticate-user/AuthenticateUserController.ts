import { AuthenticateUserError } from '@notifica-ufba/domain/errors'
import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'

import { BaseController } from '@/application/helpers'
import { UserMapper } from '@/application/mappers'

import { IValidation } from '@/validation/protocols'

export class AuthenticateUserController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {
    super()
  }

  async handle(
    request: BaseController.Request,
  ): Promise<BaseController.Response> {
    const validationError = this.validation.validate(request.body)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.authenticateUserUseCase.run(request.body)

    if (result.isRight()) {
      const { token, user } = result.value
      return this.ok({ token, user: UserMapper.toDTO(user) })
    }

    switch (result.value.constructor) {
      case AuthenticateUserError.UserDoesNotExistError:
        return this.notFound(result.value)

      case AuthenticateUserError.WrongPasswordError:
        return this.unauthorized(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
