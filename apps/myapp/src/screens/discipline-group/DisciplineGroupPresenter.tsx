import { IDiscipline, IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'

import * as api from '@/api'
import { IPaginatedList } from '@/types/list'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'
import { useAuth } from '@/contexts/auth'
import { useDispatch } from '@/store'
import { disciplineChanged } from '@/store/disciplines'

export interface DisciplineGroupPresenterContextData {
  fetching: boolean
  subscribeStudent(disciplineGroup: IDisciplineGroup): Promise<void>
}

const DisciplineGroupPresenterContext = React.createContext(
  {} as DisciplineGroupPresenterContextData,
)

export const DisciplineGroupPresenter: React.FC = ({ children }) => {
  const auth = useAuth()
  const dispatch = useDispatch()

  const [fetching, setFetching] = useState(false)

  const subscribeStudent = async (disciplineGroup: IDisciplineGroup) => {
    if (!auth.user || !auth.user.student) return

    setFetching(true)

    try {
      await api.disciplineGroup.subscribeStudent({
        disciplineGroupId: disciplineGroup.id,
        studentId: auth.user.student.id,
      })

      disciplineGroup.studentIds?.push(auth.user.student.id)
    } catch (err) {
      const error = err as BaseError

      Toast.show({
        type: 'error',
        text1: 'Erro ao inscrever estudante.',
        text2: error.message,
      })
    } finally {
      setFetching(false)
    }
  }

  return (
    <DisciplineGroupPresenterContext.Provider
      value={{ fetching, subscribeStudent }}
    >
      {children}
    </DisciplineGroupPresenterContext.Provider>
  )
}

export const withDisciplineGroupPresenter = (Component: React.FC<any>) => {
  return (props: any) => (
    <DisciplineGroupPresenter>
      <Component {...props} />
    </DisciplineGroupPresenter>
  )
}

export const useDisciplineGroupPresenter = () =>
  useContext(DisciplineGroupPresenterContext)
