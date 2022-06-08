import {
  DisciplineGroupMessagesScreen,
  DisciplineGroupPostsScreen,
} from '@/screens'
import { AppNavigation } from '@/types/navigation'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'

const Tab = createMaterialTopTabNavigator<AppNavigation>()

export const DisciplineGroupTabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DisciplineGroupPostsScreen"
        component={DisciplineGroupPostsScreen}
      />
      <Tab.Screen
        name="DisciplineGroupMessagesScreen"
        component={DisciplineGroupMessagesScreen}
      />
    </Tab.Navigator>
  )
}
