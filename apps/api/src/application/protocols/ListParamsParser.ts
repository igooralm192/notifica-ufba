import {
  IFilterListInputDTO,
  IPaginateListInputDTO,
} from '@notifica-ufba/domain/dtos'

export namespace IListParamsParser {
  export type Input = Record<string, string>
  export type Output<T> = {
    filter?: IFilterListInputDTO<T>
    paginate?: IPaginateListInputDTO
  }
}

export interface IListParamsParser<O> {
  parse(input: IListParamsParser.Input): IListParamsParser.Output<O>
}
