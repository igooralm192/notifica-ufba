import { useStatusBar } from '@/contexts/status-bar'

import { StackHeaderProps } from '@react-navigation/stack'
import { Button, useTheme } from '@rneui/themed'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Container, Title, Action } from './HeaderStyles'

export interface HeaderProps extends StackHeaderProps {}

const Header: React.FC<HeaderProps> = ({ navigation, options, back }) => {
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const statusBar = useStatusBar()

  return (
    <Container
      style={{
        paddingTop: insets.top,
        height: insets.top + 48,
        backgroundColor:
          statusBar.theme === 'light'
            ? theme.colors.white
            : theme.colors.primary,
      }}
    >
      <Action>
        {back && (
          <Button
            type="clear"
            icon={{
              name: 'arrow-back-ios',
              size: 20,
              containerStyle: {
                padding: 0,
                margin: 0,
              },
              iconStyle: {
                padding: 0,
                margin: 0,
                marginRight: 4,
              },
              color:
                statusBar.theme === 'light'
                  ? theme.colors.black
                  : theme.colors.white,
            }}
            iconContainerStyle={{
              padding: 0,
              margin: 0,
            }}
            buttonStyle={{ padding: 0, margin: 0 }}
            onPress={() => navigation.goBack()}
          />
        )}
      </Action>

      <Title
        style={{
          color:
            statusBar.theme === 'light'
              ? theme.colors.black
              : theme.colors.white,
        }}
      >
        {options?.title}
      </Title>

      <Action></Action>
    </Container>
  )
}

export default Header
