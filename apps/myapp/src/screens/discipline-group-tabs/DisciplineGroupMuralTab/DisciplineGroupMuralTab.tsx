import React from 'react'
import { FlatList } from 'react-native'

import { DisciplineGroupPostListItem } from './DisciplineGroupPostListItem'
import { Container, Title } from './DisciplineGroupMuralStyles'
import { Spacer } from '@/components'
import { useDisciplineGroupTabsPresenter } from '@/screens/discipline-group-tabs/DisciplineGroupTabsPresenter'
import { useTheme } from '@rneui/themed'

export interface DisciplineGroupMuralTabProps {}

const DisciplineGroupMuralTab: React.FC<DisciplineGroupMuralTabProps> = () => {
  const { theme } = useTheme()
  const presenter = useDisciplineGroupTabsPresenter()

  const renderDisciplineGroupPostListItem = ({ item }) => {
    return <DisciplineGroupPostListItem disciplineGroup={item} />
  }

  return (
    <Container>
      <FlatList
        style={{ backgroundColor: theme.colors.grey1 }}
        data={[{}]}
        renderItem={renderDisciplineGroupPostListItem}
        ItemSeparatorComponent={() => <Spacer />}
        contentContainerStyle={{ padding: 16 }}
      />
    </Container>
  )
}

export default DisciplineGroupMuralTab
