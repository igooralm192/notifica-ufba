import { IDiscipline } from '@notifica-ufba/domain/entities'
import { IReadDisciplinesUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'

import api from '@/api'
import { useDispatch, useSelector } from '@/store'
import { disciplinesAdded, selectAllDisciplines } from '@/store/disciplines'
import { IPaginatedList } from '@/types/list'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'

export interface MessagesPresenterContextData {
  loading: boolean
  // disciplines: IPaginatedList<IDiscipline>
  messages: any[]
  getMessages(): Promise<void>
}

const MessagesPresenterContext = React.createContext(
  {} as MessagesPresenterContextData,
)

export const MessagesPresenter: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  // const disciplines = useSelector(selectAllDisciplines)
  // const disciplinesTotal = useSelector(state => state.disciplines.total)

  const [loading, setLoading] = useState(true)

  const getMessages = async () => {
    // setLoading(true)
    // try {
    //   const disciplines = await api.discipline.getDisciplines({
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
    <MessagesPresenterContext.Provider
      value={{
        loading,
        messages: [],
        getMessages,
      }}
    >
      {children}
    </MessagesPresenterContext.Provider>
  )
}

export const withMessagesPresenter = (Component: React.FC) => {
  return (props: any) => (
    <MessagesPresenter>
      <Component {...props} />
    </MessagesPresenter>
  )
}

export const useMessagesPresenter = () => useContext(MessagesPresenterContext)
