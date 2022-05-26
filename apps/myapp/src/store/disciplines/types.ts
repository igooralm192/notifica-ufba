import { IDiscipline } from '@notifica-ufba/domain/entities'
import { EntityState } from '@reduxjs/toolkit'

export interface IDisciplinesStore {
  data: EntityState<IDiscipline>
  total: number
}
