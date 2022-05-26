import { IDiscipline } from '@notifica-ufba/domain/entities'
import { IReadDisciplinesUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'

import api from '@/api'
import { useDispatch, useSelector } from '@/store'
import { disciplinesAdded, selectAllDisciplines } from '@/store/disciplines'
import { IPaginatedList } from '@/types/list'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'

export interface DisciplinePresenterContextData {
  loading: boolean
  disciplines: IPaginatedList<IDiscipline>
  getDisciplines(input: IReadDisciplinesUseCase.Input): Promise<void>
}

const DisciplinePresenterContext = React.createContext(
  {} as DisciplinePresenterContextData,
)

export const DisciplinePresenter: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  const disciplines = useSelector(selectAllDisciplines)
  const disciplinesTotal = useSelector(state => state.disciplines.total)

  const [loading, setLoading] = useState(true)

  const getDisciplines = async ({
    paginate,
  }: IReadDisciplinesUseCase.Input) => {
    setLoading(true)

    try {
      const disciplines = await api.discipline.getDisciplines({
        paginate,
      })

      dispatch(disciplinesAdded(disciplines))
    } catch (err) {
      const error = err as BaseError

      Toast.show({
        type: 'error',
        text1: 'Erro ao retornar disciplinas.',
        text2: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DisciplinePresenterContext.Provider
      value={{
        loading,
        disciplines: {
          results: disciplines,
          total: disciplinesTotal,
        },
        getDisciplines,
      }}
    >
      {children}
    </DisciplinePresenterContext.Provider>
  )
}

export const withDisciplinePresenter = (Component: React.FC) => {
  return (props: any) => (
    <DisciplinePresenter>
      <Component {...props} />
    </DisciplinePresenter>
  )
}

export const useDisciplinePresenter = () =>
  useContext(DisciplinePresenterContext)
