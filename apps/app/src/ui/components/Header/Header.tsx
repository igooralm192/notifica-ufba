import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Button } from '@rneui/themed'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Container, Title, Action } from './HeaderStyles'

export interface HeaderProps extends NativeStackHeaderProps {}

const Header: React.FC<HeaderProps> = ({ navigation, options, back }) => {
  const insets = useSafeAreaInsets()

  return (
    <Container style={{ paddingTop: insets.top, height: insets.top + 56 }}>
      <Action>
        {back && (
          <Button
            type="clear"
            icon={{ name: 'arrow-back-ios', size: 20 }}
            onPress={() => navigation.goBack()}
          />
        )}
      </Action>

      <Title>{options?.title}</Title>

      <Action></Action>
    </Container>
  )
}

export default Header
