import { IDisciplineGroup } from '@notifica-ufba/domain/entities'

import {
  useGetDisciplineGroup,
  useSubscribeStudent,
} from '@/api/discipline-group'
import { useNavigation } from '@/helpers'
import { AppNavigation } from '@/types/navigation'

import { StackActions } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'

export interface DisciplineGroupInfoPresenterContextData {
  loading: boolean
  subscribing: boolean
  disciplineGroup: IDisciplineGroup | undefined
  subscribeStudent(): Promise<void>
}

const DisciplineGroupInfoPresenterContext = React.createContext(
  {} as DisciplineGroupInfoPresenterContextData,
)

export const DisciplineGroupInfoPresenter: React.FC<{
  disciplineGroupId: string
}> = ({ disciplineGroupId, children }) => {
  const navigation = useNavigation()

  const { data: disciplineGroup, loading } =
    useGetDisciplineGroup(disciplineGroupId)

  const {
    subscribe,
    loading: subscribing,
    response,
  } = useSubscribeStudent(disciplineGroupId)

  const subscribeStudent = async () => {
    await subscribe()

    if (response.ok) {
      navigation.dispatch(
        StackActions.replace('DisciplineGroupTabsScreen', {
          disciplineGroupId,
        }),
      )
    }
  }

  return (
    <DisciplineGroupInfoPresenterContext.Provider
      value={{
        loading,
        subscribing,
        disciplineGroup,
        subscribeStudent,
      }}
    >
      {children}
    </DisciplineGroupInfoPresenterContext.Provider>
  )
}

export const withDisciplineGroupInfoPresenter = (Component: React.FC<any>) => {
  return ({
    route,
    ...props
  }: StackScreenProps<AppNavigation, 'DisciplineGroupInfoScreen'>) => {
    const { disciplineGroupId } = route.params

    return (
      <DisciplineGroupInfoPresenter disciplineGroupId={disciplineGroupId}>
        <Component {...props} />
      </DisciplineGroupInfoPresenter>
    )
  }
}

export const useDisciplineGroupInfoPresenter = () =>
  useContext(DisciplineGroupInfoPresenterContext)
