import { ILastMessageDTO } from '@notifica-ufba/domain/usecases'

import { useStatusBar } from '@/contexts/status-bar'

import { Button, Divider } from '@rneui/themed'
import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList } from 'react-native'

import {
  useMessagesPresenter,
  withMessagesPresenter,
} from './MessagesPresenter'
import { MessagesListItem } from './MessagesListItem'
import { Container } from './MessagesStyles'
import { useAuth } from '@/contexts/auth'

export interface MessagesScreenProps {}

const MessagesScreen: React.FC<MessagesScreenProps> = props => {
  const presenter = useMessagesPresenter()

  const auth = useAuth()
  const statusBar = useStatusBar()

  const renderMessagesListItem = ({ item }: { item: ILastMessageDTO }) => {
    return <MessagesListItem key={item.disciplineGroupCode} message={item} />
  }

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  useEffect(() => {
    presenter.getLastMessages()
  }, [])

  return (
    <Container>
      <FlatList
        data={presenter.lastMessages.results}
        renderItem={renderMessagesListItem}
        ItemSeparatorComponent={Divider}
      />

      <Button title={'Logout'} onPress={() => auth.setToken(null)} />
    </Container>
  )
}

export default withMessagesPresenter(MessagesScreen)
