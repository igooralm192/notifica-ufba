import { useStatusBar } from '@/ui/contexts/status-bar'
import { IDisciplineViewModel } from '@/ui/models'
import { IDisciplinePresenter } from '@/ui/presenters'
import { observer } from 'mobx-react'
import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList } from 'react-native'

import { DisciplinesListItem } from './DisciplinesListItem'
import { Container } from './DisciplinesStyles'

export interface DisciplinesScreenProps {
  presenter: IDisciplinePresenter
}

const DisciplinesScreen: React.FC<DisciplinesScreenProps> = ({ presenter }) => {
  const statusBar = useStatusBar()

  const renderDisciplinesListItem = ({
    item,
  }: {
    item: IDisciplineViewModel
  }) => {
    return <DisciplinesListItem discipline={item} />
  }

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  useEffect(() => {
    presenter.getDisciplines({ page: 0, limit: 10 })
  }, [])

  return (
    <Container>
      <FlatList
        data={presenter.disciplines.results}
        renderItem={renderDisciplinesListItem}
      />
    </Container>
  )
}

export default observer(DisciplinesScreen)
