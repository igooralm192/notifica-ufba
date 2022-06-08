import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'

import api from '@/api'
import { useDispatch, useSelector } from '@/store'
// import {
//   disciplinesAdded,
//   selectAllDisciplineGroups,
// } from '@/store/disciplines'
import { IPaginatedList } from '@/types/list'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'

export interface DisciplineGroupsPresenterContextData {
  loading: boolean
  disciplineGroups: IPaginatedList<IDisciplineGroup>
  getDisciplineGroups(): Promise<void>
}

const DisciplineGroupsPresenterContext = React.createContext(
  {} as DisciplineGroupsPresenterContextData,
)

export const DisciplineGroupsPresenter: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  // const disciplines = useSelector(selectAllDisciplineGroups)
  // const disciplinesTotal = useSelector(state => state.disciplines.total)

  const [loading, setLoading] = useState(true)

  const getDisciplineGroups = async () => {
    setLoading(true)

    // try {
    //   const disciplines = await api.discipline.getDisciplineGroups({
    //     paginate,
    //   })

    //   dispatch(disciplinesAdded(disciplines))
    // } catch (err) {
    //   const error = err as BaseError

    //   Toast.show({
    //     type: 'error',
    //     text1: 'Erro ao retornar disciplinas.',
    //     text2: error.message,
    //   })
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <DisciplineGroupsPresenterContext.Provider
      value={{
        loading,
        disciplineGroups: {
          results: [{}],
          total: 0,
        },
        getDisciplineGroups,
      }}
    >
      {children}
    </DisciplineGroupsPresenterContext.Provider>
  )
}

export const withDisciplineGroupsPresenter = (Component: React.FC) => {
  return (props: any) => (
    <DisciplineGroupsPresenter>
      <Component {...props} />
    </DisciplineGroupsPresenter>
  )
}

export const useDisciplineGroupsPresenter = () =>
  useContext(DisciplineGroupsPresenterContext)
