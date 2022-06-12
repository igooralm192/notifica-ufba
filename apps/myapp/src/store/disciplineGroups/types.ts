import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { EntityState } from '@reduxjs/toolkit'

export interface IDisciplineGroupsStore {
  data: EntityState<IDisciplineGroup>
  total: number
}
