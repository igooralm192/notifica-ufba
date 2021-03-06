import {
  IFilterListInputDTO,
  IPaginateListInputDTO,
} from '@notifica-ufba/domain/dtos'
import { IListParamsParser } from '@/application/protocols'

export class ListParamsParser<T> implements IListParamsParser<T> {
  parse(input: IListParamsParser.Input): IListParamsParser.Output<T> {
    const filterArgs = this.parseFilter(input)
    const paginateArgs = this.parsePaginate(input)

    return {
      filter: filterArgs,
      paginate: paginateArgs,
    }
  }

  private parseFilter(input: IListParamsParser.Input): IFilterListInputDTO<T> {
    const filter: IFilterListInputDTO<T> = {}

    Object.entries(input).forEach(([key, value]) => {
      if (key.endsWith('_has')) {
        const field = key.replace('_has', '')
        filter[field] = { has: value }
      }
    })

    return filter
  }

  private parsePaginate(input: IListParamsParser.Input): IPaginateListInputDTO {
    const paginate: IPaginateListInputDTO = {}

    Object.entries(input).forEach(([key, value]) => {
      switch (key) {
        case 'page':
          paginate.page = Number(value)
          break

        case 'limit':
          paginate.limit = Number(value)
          break
      }
    })

    return paginate
  }
}
