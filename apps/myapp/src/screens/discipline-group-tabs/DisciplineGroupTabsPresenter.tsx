import {
  IDisciplineGroup,
  IDisciplineGroupMessage,
  IDisciplineGroupPost,
} from '@notifica-ufba/domain/entities'

import {
  useGetDisciplineGroup,
  useGetDisciplineGroupMessages,
  useGetDisciplineGroupPosts,
} from '@/api/discipline-group'
import { AppNavigation } from '@/types/navigation'
import { IPaginatedList } from '@/types/list'

import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'

interface DisciplineGroupTabsPresenterProps {
  disciplineGroupId: string
  initialTab?: 'mural' | 'chat'
}

export interface DisciplineGroupTabsPresenterContextData {
  initialIndex: number
  loading: boolean
  loadingPosts: boolean
  loadingMessages: boolean
  disciplineGroup: IDisciplineGroup | undefined
  disciplineGroupPosts: IPaginatedList<IDisciplineGroupPost>
  disciplineGroupMessages: IPaginatedList<IDisciplineGroupMessage>
}

const DisciplineGroupTabsPresenterContext = React.createContext(
  {} as DisciplineGroupTabsPresenterContextData,
)

export const DisciplineGroupTabsPresenter: React.FC<
  DisciplineGroupTabsPresenterProps
> = ({ disciplineGroupId, initialTab, children }) => {
  const { data: disciplineGroup, loading } =
    useGetDisciplineGroup(disciplineGroupId)

  const { data: disciplineGroupPosts, loading: loadingPosts } =
    useGetDisciplineGroupPosts(disciplineGroupId)

  const { data: disciplineGroupMessages, loading: loadingMessages } =
    useGetDisciplineGroupMessages(disciplineGroupId)

  return (
    <DisciplineGroupTabsPresenterContext.Provider
      value={{
        initialIndex: initialTab === 'chat' ? 1 : 0,
        loading,
        loadingPosts,
        loadingMessages,
        disciplineGroup,
        disciplineGroupPosts,
        disciplineGroupMessages,
      }}
    >
      {children}
    </DisciplineGroupTabsPresenterContext.Provider>
  )
}

export const withDisciplineGroupTabsPresenter = (Component: React.FC<any>) => {
  return ({
    route,
    ...props
  }: StackScreenProps<AppNavigation, 'DisciplineGroupTabsScreen'>) => {
    return (
      <DisciplineGroupTabsPresenter {...route.params}>
        <Component {...props} />
      </DisciplineGroupTabsPresenter>
    )
  }
}

export const useDisciplineGroupTabsPresenter = () =>
  useContext(DisciplineGroupTabsPresenterContext)
