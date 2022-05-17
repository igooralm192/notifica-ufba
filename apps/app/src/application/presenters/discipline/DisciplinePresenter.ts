import { IDiscipline } from '@notifica-ufba/domain/entities'
import { IReadDisciplinesUseCase } from '@notifica-ufba/domain/usecases'

import { DisciplineMapper } from '@/application/mappers'
import { IDisciplineViewModel } from '@/ui/models'
import { IDisciplinePresenter } from '@/ui/presenters'
import { IPaginatedList } from '@/ui/types/list'

import { makeAutoObservable } from 'mobx'

export class DisciplinePresenter implements IDisciplinePresenter {
  loading = false
  disciplines: IPaginatedList<IDisciplineViewModel> = { results: [], total: 0 }

  constructor(
    private readonly readDisciplinesUseCase: IReadDisciplinesUseCase,
  ) {
    makeAutoObservable(this)
  }

  async getDisciplines({
    page,
    limit,
  }: IDisciplinePresenter.Input): Promise<void> {
    this.showLoading()

    const result = await this.readDisciplinesUseCase.run({
      paginate: { page, limit },
    })

    if (result.isLeft()) {
      // TODO: Handle error
      this.hideLoading()
      return
    }

    this.setDisciplines(result.value)

    this.hideLoading()
    return
  }

  private setDisciplines({ results, total }: IPaginatedList<IDiscipline>) {
    this.disciplines = {
      results: results.map(result => DisciplineMapper.toViewModel(result)),
      total,
    }
  }

  private showLoading() {
    this.loading = true
  }

  private hideLoading() {
    this.loading = false
  }
}
