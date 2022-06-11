import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'

import api from '@/api'
import { useDispatch, useSelector } from '@/store'
// import {
//   disciplinesAdded,
//   selectAllDisciplineGroups,
// } from '@/store/disciplines'
import { IPaginatedList } from '@/types/list'

import React, { useContext, useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import {
  disciplineGroupsAdded,
  selectAllDisciplineGroups,
} from '@/store/disciplineGroups'

export interface DisciplineGroupsPresenterContextData {
  loading: boolean
  disciplineGroups: IPaginatedList<IDisciplineGroup>
}

const DisciplineGroupsPresenterContext = React.createContext(
  {} as DisciplineGroupsPresenterContextData,
)

export const DisciplineGroupsPresenter: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  const disciplineGroups = useSelector(selectAllDisciplineGroups)
  const disciplineGroupsTotal = useSelector(
    state => state.disciplineGroups.total,
  )

  const [loading, setLoading] = useState(true)

  const getDisciplineGroups = async (page = 0, limit = 10) => {
    setLoading(true)

    try {
      const disciplineGroups = await api.disciplineGroup.getMyDisciplineGroups({
        page,
        limit,
      })

      dispatch(disciplineGroupsAdded(disciplineGroups))
    } catch (err) {
      const error = err as BaseError

      Toast.show({
        type: 'error',
        text1: 'Erro ao retornar turmas.',
        text2: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDisciplineGroups()
  }, [])

  return (
    <DisciplineGroupsPresenterContext.Provider
      value={{
        loading,
        disciplineGroups: {
          results: disciplineGroups,
          total: disciplineGroupsTotal,
        },
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
