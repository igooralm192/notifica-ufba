import { IDisciplineGroupPost } from '@notifica-ufba/domain/entities'
import { FullLoading, Spacer } from '@/components'

import { useTheme } from '@rneui/themed'
import React from 'react'
import { FlatList } from 'react-native'

import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'
import { DisciplineGroupPostListItem } from './DisciplineGroupPostListItem'

export interface DisciplineGroupMuralTabProps {}

const DisciplineGroupMuralTab: React.FC<DisciplineGroupMuralTabProps> = () => {
  const { theme } = useTheme()

  const { loadingPosts, disciplineGroupPosts } =
    useDisciplineGroupTabsPresenter()

  const renderDisciplineGroupPostListItem = ({
    item,
  }: {
    item: IDisciplineGroupPost
  }) => {
    return <DisciplineGroupPostListItem disciplineGroupPost={item} />
  }

  return (
    <FullLoading loading={loadingPosts}>
      <FlatList
        style={{ backgroundColor: theme.colors.grey1 }}
        data={disciplineGroupPosts.results}
        renderItem={renderDisciplineGroupPostListItem}
        ItemSeparatorComponent={Spacer}
        contentContainerStyle={{ padding: 16 }}
      />
    </FullLoading>
  )
}

export default DisciplineGroupMuralTab
