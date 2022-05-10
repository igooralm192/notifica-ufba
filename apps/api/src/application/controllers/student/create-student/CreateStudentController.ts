import { CreateStudentError } from '@notifica-ufba/domain/errors'
import { ICreateStudentUseCase } from '@notifica-ufba/domain/usecases'

import { BaseController } from '@/application/helpers'
import { StudentViewModel } from '@/application/models'

import { IValidation } from '@/validation/protocols'

export class CreateStudentController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly createStudentUseCase: ICreateStudentUseCase,
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

    const result = await this.createStudentUseCase.run(request.body)

    if (result.isRight()) {
      return this.ok({
        student: StudentViewModel.fromDTO(result.value.student),
      })
    }

    switch (result.value.constructor) {
      case CreateStudentError.StudentAlreadyExistsError:
        return this.forbidden(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
