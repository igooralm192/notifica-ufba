import { useAuth } from '@/contexts/auth'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'
import { DisciplineGroupChatTab } from '@/screens/discipline-group-tabs/DisciplineGroupChatTab'
import { DisciplineGroupMuralTab } from '@/screens/discipline-group-tabs/DisciplineGroupMuralTab'
import { Tab, TabView } from '@rneui/themed'

import React, { useLayoutEffect, useState } from 'react'

import {
  useDisciplineGroupTabsPresenter,
  withDisciplineGroupTabsPresenter,
} from './DisciplineGroupTabsPresenter'
import { Container } from './DisciplineGroupTabsStyles'

const DisciplineGroupTabsScreen: React.FC = () => {
  const presenter = useDisciplineGroupTabsPresenter()

  const disciplineGroup = presenter.disciplineGroup
  const discipline = presenter.disciplineGroup?.discipline

  const navigation = useNavigation()

  const [index, setIndex] = useState(0)

  useStatusBar('primary')

  return (
    <Container
      headerProps={{
        title: 'MATA02 - T010000',
        subtitle: 'Cálculo A',
        titleAlign: 'center',
        rightAction: {
          icon: 'information-outline',
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
          title="Mural"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'rss', type: 'material-community', color: 'white' }}
        />
        <Tab.Item
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
  )
}

export default withDisciplineGroupTabsPresenter(DisciplineGroupTabsScreen)
