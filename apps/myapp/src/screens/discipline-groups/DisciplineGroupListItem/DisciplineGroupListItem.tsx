import { IDiscipline, IDisciplineGroup } from '@notifica-ufba/domain/entities'

import { useNavigation } from '@/helpers'

import { Icon, ListItem } from '@rneui/themed'
import React, { useState } from 'react'

import {
  Container,
  LeftContainer,
  LeftTopContainer,
  LeftBottomContainer,
  RightContainer,
  DisciplineCode,
  DisciplineGroupCode,
  DisciplineName,
  DisciplineGroupTeacher,
} from './DisciplineGroupListItemStyles'
import { Spacer } from '@/components'

export interface DisciplineGroupListItemProps {
  disciplineGroup: IDisciplineGroup
}

const DisciplineGroupListItem: React.FC<DisciplineGroupListItemProps> = ({
  disciplineGroup,
}) => {
  const navigation = useNavigation()

  return (
    <Container
      onPress={() =>
        navigation.navigate('DisciplineGroupTabsNavigator', {
          screen: 'DisciplineGroupPostsScreen',
          params: {
            disciplineGroupId: disciplineGroup.id,
          },
        })
      }
    >
      <LeftContainer>
        <LeftTopContainer>
          <DisciplineCode>MATA02 - T010000</DisciplineCode>
          <DisciplineName>Cálculo A</DisciplineName>
        </LeftTopContainer>

        <Spacer />

        <LeftBottomContainer>
          <DisciplineGroupTeacher>Professor</DisciplineGroupTeacher>
        </LeftBottomContainer>
      </LeftContainer>

      <RightContainer>
        <Icon name="more-vert" />
      </RightContainer>
    </Container>
  )
}

export default DisciplineGroupListItem
