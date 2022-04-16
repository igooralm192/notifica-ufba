import { LoginError } from '@/domain/errors'
import { ILoginUseCase } from '@/domain/usecases'

import {
  Controller,
  IControllerResponse,
} from '@/application/controllers/Controller'
import { UserViewModel } from '@/application/models'
import { IValidation } from '@/validation/protocols'

export class LoginController extends Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly loginUseCase: ILoginUseCase,
  ) {
    super()
  }

  async handle(request: any): Promise<IControllerResponse> {
    const validationError = this.validation.validate(request)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.loginUseCase.run(request)

    if (result.isRight()) {
      const { token, user } = result.value
      return this.ok({ token, user: UserViewModel.fromDTO(user).toJSON() })
    }

    switch (result.value.constructor) {
      case LoginError.UserDoesNotExistError:
        return this.notFound(result.value)

      case LoginError.WrongPasswordError:
        return this.unauthorized(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
