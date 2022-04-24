import { CreateStudentError } from '@/domain/errors'
import { ICreateStudentUseCase } from '@/domain/usecases'

import { IControllerResponseDTO } from '@/application/dtos'
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

  async handle(request: any): Promise<IControllerResponseDTO> {
    const validationError = this.validation.validate(request)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.createStudentUseCase.run(request)

    if (result.isRight()) {
      return this.ok({
        student: StudentViewModel.fromDTO(result.value.student).toJSON(),
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
