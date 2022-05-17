import { IDisciplineViewModel } from '@/ui/models'
import { IPaginatedList } from '@/ui/types/list'

export namespace IDisciplinePresenter {
  export type Input = {
    page: number
    limit: number
  }
}

export interface IDisciplinePresenter {
  loading: boolean
  disciplines: IPaginatedList<IDisciplineViewModel>

  getDisciplines(input: IDisciplinePresenter.Input): Promise<void>
}
