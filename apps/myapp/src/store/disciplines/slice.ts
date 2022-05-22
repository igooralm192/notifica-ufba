import { IDiscipline } from '@notifica-ufba/domain/entities'
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { AppState } from '..'

const disciplinesAdapter = createEntityAdapter<IDiscipline>()

const disciplinesSlice = createSlice({
  name: 'disciplines',
  initialState: disciplinesAdapter.getInitialState(),
  reducers: {
    disciplineAdded: disciplinesAdapter.addOne,
    disciplinesAdded: disciplinesAdapter.addMany,
    disciplineChanged: disciplinesAdapter.updateOne,
    disciplineRemoved: disciplinesAdapter.removeOne,
    cleanDisciplines: disciplinesAdapter.removeAll,
  },
})

export const {
  selectAll: selectAllDisciplines,
  selectById: selectDisciplineById,
} = disciplinesAdapter.getSelectors<AppState>(state => state.disciplines)

export const {
  disciplineAdded,
  disciplinesAdded,
  disciplineChanged,
  disciplineRemoved,
  cleanDisciplines,
} = disciplinesSlice.actions

export default disciplinesSlice.reducer
