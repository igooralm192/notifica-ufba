import { IDisciplineGroupMessage } from '@notifica-ufba/domain/entities'
import { FullLoading, Spacer } from '@/components'

import { useTheme } from '@rneui/themed'
import React from 'react'
import { FlatList } from 'react-native'

import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'
import { DisciplineGroupMessageListItem } from './DisciplineGroupMessageListItem'
// import { Container } from './DisciplineGroupChatStyles'

export interface DisciplineGroupChatTabProps {}

const DisciplineGroupChatTab: React.FC<DisciplineGroupChatTabProps> = props => {
  const { theme } = useTheme()

  const { loadingMessages, disciplineGroupMessages } =
    useDisciplineGroupTabsPresenter()

  const renderDisciplineGroupMessageListItem = ({
    item,
  }: {
    item: IDisciplineGroupMessage
  }) => {
    return (
      <DisciplineGroupMessageListItem
        key={item.id}
        disciplineGroupMessage={item}
      />
    )
  }

  return (
    <FullLoading loading={loadingMessages}>
      <FlatList
        style={{ backgroundColor: theme.colors.grey1 }}
        data={disciplineGroupMessages.results}
        renderItem={renderDisciplineGroupMessageListItem}
        ItemSeparatorComponent={Spacer}
        contentContainerStyle={{ padding: 16 }}
        inverted
      />
    </FullLoading>
  )
}

export default DisciplineGroupChatTab
