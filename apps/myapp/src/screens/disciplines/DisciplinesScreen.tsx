import { IDiscipline } from '@notifica-ufba/domain/entities'

import { useStatusBar } from '@/contexts/status-bar'

import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList } from 'react-native'

import {
  useDisciplinePresenter,
  withDisciplinePresenter,
} from './DisciplinePresenter'
import { DisciplinesListItem } from './DisciplinesListItem'
import { Container } from './DisciplinesStyles'

export interface DisciplinesScreenProps {}

const DisciplinesScreen: React.FC<DisciplinesScreenProps> = props => {
  const presenter = useDisciplinePresenter()

  const statusBar = useStatusBar()

  const renderDisciplinesListItem = ({ item }: { item: IDiscipline }) => {
    return <DisciplinesListItem discipline={item} />
  }

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  useEffect(() => {
    presenter.getDisciplines({ paginate: { page: 0, limit: 10 } })
  }, [])

  return (
    <Container headerProps={{ title: 'Disciplinas', back: false }}>
      <FlatList
        data={presenter.disciplines.results}
        renderItem={renderDisciplinesListItem}
      />

      {/* <Button title={'Logout'} onPress={() => auth.setToken(null)} /> */}
    </Container>
  )
}

export default withDisciplinePresenter(DisciplinesScreen)
