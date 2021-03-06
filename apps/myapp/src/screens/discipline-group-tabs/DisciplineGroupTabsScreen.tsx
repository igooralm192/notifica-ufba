import { FullLoading } from '@/components'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'

import { Tab, TabView, useTheme } from '@rneui/themed'
import React, { useState } from 'react'

import { DisciplineGroupChatTab } from './DisciplineGroupChatTab'
import { DisciplineGroupMuralTab } from './DisciplineGroupMuralTab'
import {
  useDisciplineGroupTabsPresenter,
  withDisciplineGroupTabsPresenter,
} from './DisciplineGroupTabsPresenter'
import { Container } from './DisciplineGroupTabsStyles'

const DisciplineGroupTabsScreen: React.FC = () => {
  const { initialIndex, loading, disciplineGroup } =
    useDisciplineGroupTabsPresenter()

  const navigation = useNavigation()
  const { theme } = useTheme()
  const [index, setIndex] = useState(initialIndex)

  useStatusBar('primary')

  const disciplineGroupCode = disciplineGroup?.code
  const disciplineCode = disciplineGroup?.discipline?.code
  const disciplineName = disciplineGroup?.discipline?.name

  return (
    <FullLoading loading={loading}>
      <Container
        headerProps={{
          title: `${disciplineCode} - ${disciplineGroupCode}`,
          subtitle: disciplineName,
          titleAlign: 'center',
          rightAction: {
            icon: 'information-outline',
            onPress: () => {
              if (disciplineGroup)
                navigation.navigate('DisciplineGroupInfoScreen', {
                  disciplineGroupId: disciplineGroup.id,
                })
            },
          },
        }}
      >
        <Tab
          value={index}
          onChange={e => setIndex(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
          variant="primary"
        >
          <Tab.Item
            containerStyle={{ backgroundColor: theme.colors.primary }}
            title="Mural"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'rss', type: 'material-community', color: 'white' }}
          />
          <Tab.Item
            containerStyle={{ backgroundColor: theme.colors.primary }}
            title="Chat"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'chat', type: 'material-community', color: 'white' }}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ width: '100%' }}>
            <DisciplineGroupMuralTab />
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <DisciplineGroupChatTab />
          </TabView.Item>
        </TabView>
      </Container>
    </FullLoading>
  )
}

export default withDisciplineGroupTabsPresenter(DisciplineGroupTabsScreen)
