import { IPaginateListInputDTO } from '@notifica-ufba/domain/dtos'

export namespace IListParamsParser {
  export type Input = Record<string, string>
  export type Output = {
    paginate?: IPaginateListInputDTO
  }
}

export interface IListParamsParser {
  parse(input: Record<string, string>): IListParamsParser.Output
}
