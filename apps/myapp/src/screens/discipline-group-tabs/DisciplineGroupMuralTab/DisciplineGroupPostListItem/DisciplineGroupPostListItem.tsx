import { IDiscipline, IDisciplineGroup } from '@notifica-ufba/domain/entities'

import { useNavigation } from '@/helpers'

import { Avatar, Icon, ListItem, useTheme } from '@rneui/themed'
import React, { useState } from 'react'

import {
  Container,
  TopContainer,
  BottomContainer,
  AuthorName,
  CreatedAt,
  ContentBody,
} from './DisciplineGroupPostListItemStyles'
import { Spacer } from '@/components'
import { View } from 'react-native'

export interface DisciplineGroupPostListItemProps {
  disciplineGroup: IDisciplineGroup
}

const DisciplineGroupPostListItem: React.FC<
  DisciplineGroupPostListItemProps
> = ({ disciplineGroup }) => {
  const { theme } = useTheme()
  const navigation = useNavigation()

  return (
    <Container
      onPress={() =>
        navigation.navigate('DisciplineGroupTabsScreen', {
          disciplineGroupId: disciplineGroup.id,
        })
      }
    >
      <TopContainer>
        <Avatar
          size={32}
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: theme.colors.primary }}
        />

        <Spacer d="horizontal" s={4} />

        <View style={{ flex: 1 }}>
          <AuthorName>Igor de Almeida</AuthorName>
          <CreatedAt>5 minutos atrás</CreatedAt>
        </View>

        <Spacer d="horizontal" s={4} />

        <Icon name="more-vert" />
      </TopContainer>

      <Spacer />

      <BottomContainer>
        <ContentBody>Lorem ipsum</ContentBody>
      </BottomContainer>
    </Container>
  )
}

export default DisciplineGroupPostListItem
