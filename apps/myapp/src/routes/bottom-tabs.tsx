import { DisciplinesScreen, MessagesScreen } from '@/screens'
import { AppNavigation } from '@/types/navigation'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@rneui/themed'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const BottomTab = createBottomTabNavigator<AppNavigation>()

export const BottomTabsNavigator = () => {
  const { theme } = useTheme()

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { height: 64 },
        tabBarItemStyle: { padding: 12 },
      }}
    >
      <BottomTab.Screen
        name="MessagesScreen"
        options={{
          title: 'Mensagens',
          tabBarIcon: ({ color, size }) => (
            <Icon name="message" color={color} size={size} />
          ),
        }}
        component={MessagesScreen}
      />
      <BottomTab.Screen
        name="DisciplinesScreen"
        options={{
          title: 'Disciplinas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="subject" color={color} size={size} />
          ),
        }}
        component={DisciplinesScreen}
      />
    </BottomTab.Navigator>
  )
}
