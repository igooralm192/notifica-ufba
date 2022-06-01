import { ILastMessageDTO } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'

import api from '@/api'
import { useDispatch, useSelector } from '@/store'
import { lastMessagesAdded, selectAllLastMessages } from '@/store/lastMessages'
import { IPaginatedList } from '@/types/list'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'

export interface MessagesPresenterContextData {
  loading: boolean
  lastMessages: IPaginatedList<ILastMessageDTO>
  getLastMessages(): Promise<void>
}

const MessagesPresenterContext = React.createContext(
  {} as MessagesPresenterContextData,
)

export const MessagesPresenter: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  const lastMessages = useSelector(selectAllLastMessages)
  const lastMessagesTotal = useSelector(state => state.lastMessages.total)

  const [loading, setLoading] = useState(true)

  const getLastMessages = async (page = 0, limit = 10) => {
    setLoading(true)

    try {
      const lastMessages = await api.disciplineGroup.getMyLastMessages({
        page,
        limit,
      })

      dispatch(lastMessagesAdded(lastMessages))
    } catch (err) {
      const error = err as BaseError
      Toast.show({
        type: 'error',
        text1: 'Erro ao retornar as últimas mensagens.',
        text2: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MessagesPresenterContext.Provider
      value={{
        loading,
        lastMessages: { results: lastMessages, total: lastMessagesTotal },
        getLastMessages,
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
