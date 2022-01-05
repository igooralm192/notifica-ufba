import { LoginError } from '@notifica-ufba/domain/errors'
import { ILoginUseCase } from '@notifica-ufba/domain/usecases'

import {
  IController,
  IHttpResponse,
  IValidation,
} from '@/presentation/protocols'
import { BaseController } from '@/presentation/helpers'

export class LoginController extends BaseController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly loginUseCase: ILoginUseCase,
  ) {
    super()
  }

  async handle(request: any): Promise<IHttpResponse<any>> {
    const validationError = await this.validation.validate(request)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.loginUseCase.run(request)

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case LoginError.UserDoesNotExistError:
          return this.notFound(result.value)

        case LoginError.WrongPasswordError:
          return this.unauthorized(result.value)
      }
    }

    return this.ok(result.value)
  }
}
