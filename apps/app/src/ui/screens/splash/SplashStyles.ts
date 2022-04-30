import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Spinner = styled(ActivityIndicator).attrs(({ theme }) => {
  return {
    color: theme.colors.primary,
    size: 'large',
  }
})``
