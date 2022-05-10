import { IPaginateListInputDTO } from '@notifica-ufba/domain/dtos'
import { IListParamsParser } from '@/application/protocols'

export class ListParamsParser implements IListParamsParser {
  parse(input: IListParamsParser.Input): IListParamsParser.Output {
    const paginateList: IPaginateListInputDTO = {}

    Object.entries(input).forEach(([key, value]) => {
      switch (key) {
        case 'page':
          paginateList.page = Number(value)
          break

        case 'limit':
          paginateList.limit = Number(value)
          break
      }
    })

    return {
      paginate: paginateList,
    }
  }
}
