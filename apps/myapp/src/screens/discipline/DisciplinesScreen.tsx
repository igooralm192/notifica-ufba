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
import { Button } from '@/components'
import { useAuth } from '@/contexts/auth'

export interface DisciplinesScreenProps {}

const DisciplinesScreen: React.FC<DisciplinesScreenProps> = props => {
  const presenter = useDisciplinePresenter()

  const auth = useAuth()
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
    <Container>
      <FlatList
        data={presenter.disciplines.results}
        renderItem={renderDisciplinesListItem}
      />

      <Button title={'Logout'} onPress={() => auth.setToken(null)} />
    </Container>
  )
}

export default withDisciplinePresenter(DisciplinesScreen)
