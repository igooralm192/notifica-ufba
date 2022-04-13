import LogoSVG from '@/ui/assets/logo.svg'

import styled from '@emotion/native'
import { Text } from '@rneui/themed'

export const Container = styled.View`
  padding: 16px;
  flex: 1;
  align-items: center;
`

export const Logo = styled(LogoSVG)`
  margin: 16px 0 32px;
`

export const WelcomeText = styled(Text)`
  margin: 16px 0 48px;
  font-family: 'Quicksand_400Regular';
  font-size: 16px;
  text-align: center;
`
