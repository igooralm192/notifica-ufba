import { IDiscipline } from '@notifica-ufba/domain/entities'

import { useNavigation } from '@/helpers'

import { ListItem } from '@rneui/themed'
import React, { useState } from 'react'

import {
  Container,
  DisciplineDetailsContainer,
  DisciplineTimestampContainer,
  DisciplineName,
  DisciplineMessage,
  DisciplineMessageTime,
  DisciplineMessageBadge,
} from './MessagesListItemStyles'

export interface MessagesListItemProps {}

const MessagesListItem: React.FC<MessagesListItemProps> = () => {
  const navigation = useNavigation()

  return (
    <ListItem
      containerStyle={{ paddingHorizontal: 16 }}
      // onPress={() =>
      //   navigation.navigate('MessageDetailsScreen', {
      //     discipline,
      //     disciplineGroup: group,
      //   })
      // }
    >
      <ListItem.Content>
        <Container>
          <DisciplineDetailsContainer>
            <DisciplineName>Inteligência Artificial</DisciplineName>
            <DisciplineMessage numberOfLines={2}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              indu Lorem Ipsum is simply dummy text of the printing and
              typesetting indu Lorem Ipsum is simply dummy text of the printing
              and typesetting
            </DisciplineMessage>
          </DisciplineDetailsContainer>

          <DisciplineTimestampContainer>
            <DisciplineMessageTime>2 min</DisciplineMessageTime>
            <DisciplineMessageBadge></DisciplineMessageBadge>
          </DisciplineTimestampContainer>
        </Container>
      </ListItem.Content>
    </ListItem>
  )
}

export default MessagesListItem
