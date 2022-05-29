import { Button } from '@/components'
import { useAuth } from '@/contexts/auth'
import { useStatusBar } from '@/contexts/status-bar'

import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList } from 'react-native'

import {
  useMessagesPresenter,
  withMessagesPresenter,
} from './MessagesPresenter'
import { MessagesListItem } from './MessagesListItem'
import { Container } from './MessagesStyles'
import { Divider } from '@rneui/themed'

export interface MessagesScreenProps {}

const MessagesScreen: React.FC<MessagesScreenProps> = props => {
  const presenter = useMessagesPresenter()

  const auth = useAuth()
  const statusBar = useStatusBar()

  const renderMessagesListItem = () => {
    return <MessagesListItem />
  }

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  useEffect(() => {
    presenter.getMessages()
  }, [])

  return (
    <Container>
      <FlatList
        data={[{}, {}]}
        renderItem={renderMessagesListItem}
        ItemSeparatorComponent={Divider}
      />
    </Container>
  )
}

export default withMessagesPresenter(MessagesScreen)
