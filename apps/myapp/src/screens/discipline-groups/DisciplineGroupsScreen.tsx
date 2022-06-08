import { useAuth } from '@/contexts/auth'
import { useStatusBar } from '@/contexts/status-bar'
import { DisciplineGroupListItem } from '@/screens/discipline-groups/DisciplineGroupListItem'
import { IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { useTheme } from '@rneui/themed'

import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList, View } from 'react-native'

import {
  useDisciplineGroupsPresenter,
  withDisciplineGroupsPresenter,
} from './DisciplineGroupsPresenter'
import { Container } from './DisciplineGroupsStyles'

export interface DisciplineGroupsScreenProps {}

const DisciplineGroupsScreen: React.FC<DisciplineGroupsScreenProps> = () => {
  const presenter = useDisciplineGroupsPresenter()

  const auth = useAuth()
  const statusBar = useStatusBar()
  const { theme } = useTheme()

  const renderDisciplineGroupListItem = ({
    item,
  }: {
    item: IDisciplineGroup
  }) => {
    return <DisciplineGroupListItem disciplineGroup={item} />
  }

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  useEffect(() => {
    presenter.getDisciplineGroups()
  }, [])

  return (
    <Container headerProps={{ title: 'Turmas' }}>
      <FlatList
        style={{ backgroundColor: theme.colors.grey1 }}
        data={presenter.disciplineGroups.results}
        renderItem={renderDisciplineGroupListItem}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </Container>
  )
}

export default withDisciplineGroupsPresenter(DisciplineGroupsScreen)
