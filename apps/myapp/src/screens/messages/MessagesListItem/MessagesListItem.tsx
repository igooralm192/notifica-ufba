import { ILastMessageDTO } from '@notifica-ufba/domain/usecases'

import { useNavigation } from '@/helpers'

import { ListItem } from '@rneui/themed'
import { formatDistanceToNow } from 'date-fns'
import LocalePTBR from 'date-fns/locale/pt-BR'
import React from 'react'

import {
  Container,
  DisciplineDetailsContainer,
  DisciplineTimestampContainer,
  DisciplineName,
  DisciplineMessage,
  DisciplineMessageTime,
} from './MessagesListItemStyles'

export interface MessagesListItemProps {
  message: ILastMessageDTO
}

const MessagesListItem: React.FC<MessagesListItemProps> = ({ message }) => {
  const navigation = useNavigation()

  return (
    <ListItem
      containerStyle={{ paddingHorizontal: 16 }}
      onPress={() =>
        navigation.navigate('DisciplineGroupMessagesScreen', {
          disciplineGroupId: message.disciplineGroupId,
        })
      }
    >
      <ListItem.Content>
        <Container>
          <DisciplineDetailsContainer>
            <DisciplineName>{message.disciplineName}</DisciplineName>
            <DisciplineMessage numberOfLines={2}>
              {message.message}
            </DisciplineMessage>
          </DisciplineDetailsContainer>

          <DisciplineTimestampContainer>
            <DisciplineMessageTime>
              {formatDistanceToNow(message.sentAt, {
                locale: LocalePTBR,
              })}
            </DisciplineMessageTime>
          </DisciplineTimestampContainer>
        </Container>
      </ListItem.Content>
    </ListItem>
  )
}

export default MessagesListItem
