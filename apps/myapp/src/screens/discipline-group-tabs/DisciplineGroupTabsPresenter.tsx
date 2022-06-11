import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { BaseError } from '@notifica-ufba/errors'

import api from '@/api'
import { useAuth } from '@/contexts/auth'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'
import { StackScreenProps } from '@react-navigation/stack'
import { AppNavigation } from '@/types/navigation'

export interface DisciplineGroupTabsPresenterContextData {
  fetching: boolean
  disciplineGroup: IDisciplineGroup | undefined
  getDisciplineGroupById(): Promise<void>
}

const DisciplineGroupTabsPresenterContext = React.createContext(
  {} as DisciplineGroupTabsPresenterContextData,
)

export const DisciplineGroupTabsPresenter: React.FC<{
  disciplineGroupId: string
}> = ({ disciplineGroupId, children }) => {
  const auth = useAuth()

  const [fetching, setFetching] = useState(false)

  const [disciplineGroup, setDisciplineGroup] = useState<IDisciplineGroup>()

  const getDisciplineGroupById = async () => {}

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
    <DisciplineGroupTabsPresenterContext.Provider
      value={{
        fetching,
        disciplineGroup,
        getDisciplineGroupById,
      }}
    >
      {children}
    </DisciplineGroupTabsPresenterContext.Provider>
  )
}

export const withDisciplineGroupTabsPresenter = (
  Component: React.FC<any>,
) => {
  return ({
    route,
    ...props
  }: StackScreenProps<AppNavigation, 'DisciplineGroupTabsScreen'>) => {
    const { disciplineGroupId } = route.params

    return (
      <DisciplineGroupTabsPresenter disciplineGroupId={disciplineGroupId}>
        <Component {...props} />
      </DisciplineGroupTabsPresenter>
    )
  }
}

export const useDisciplineGroupTabsPresenter = () =>
  useContext(DisciplineGroupTabsPresenterContext)
