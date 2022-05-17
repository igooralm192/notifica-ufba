import { CommonError } from '@notifica-ufba/domain/errors'
import { IReadDisciplinesUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'
import { Either, left, right } from '@notifica-ufba/utils'

import { IHttpApi } from '@/data/contracts'
import { DisciplineModel } from '@/data/models'

export class ReadDisciplinesUseCase implements IReadDisciplinesUseCase {
  constructor(private readonly httpApi: IHttpApi) {}

  async run({
    paginate,
  }: IReadDisciplinesUseCase.Input): Promise<
    Either<BaseError, IReadDisciplinesUseCase.Output>
  > {
    const response = await this.httpApi.request({
      url: '/disciplines',
      method: 'get',
      params: {
        page: paginate?.page,
        limit: paginate?.limit,
      },
    })

    switch (response.statusCode) {
      case 200: {
        const results = response.body.results as Record<string, any>[]

        return right({
          results: results.map(discipline =>
            DisciplineModel.fromJSON(discipline).toEntity(),
          ),
          total: response.body.total,
        })
      }
      case 500: {
        const error = new Error()
        error.stack = response.stack
        return left(new CommonError.InternalServerError(error))
      }
      default:
        return response.body
    }
  }
}
