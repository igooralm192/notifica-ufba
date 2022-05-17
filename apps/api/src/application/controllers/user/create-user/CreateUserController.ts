import { CreateUserError } from '@notifica-ufba/domain/errors'
import { ICreateUserUseCase } from '@notifica-ufba/domain/usecases'

import { BaseController } from '@/application/helpers'
import { UserMapper } from '@/application/mappers'

import { IValidation } from '@/validation/protocols'

export class CreateUserController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly createUserUseCase: ICreateUserUseCase,
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

    const result = await this.createUserUseCase.run(request.body)

    if (result.isRight()) {
      return this.ok({
        user: UserMapper.toDTO(result.value.user),
      })
    }

    switch (result.value.constructor) {
      case CreateUserError.UserAlreadyExistsError:
        return this.forbidden(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
