import { Button, ButtonProps } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled(Button).attrs<ButtonProps>(({ theme }) => {
  return {
    titleStyle: {
      fontFamily: 'Quicksand_700Bold',
      fontSize: 18,
    },
    buttonStyle: {
      padding: 16,
      backgroundColor: theme.colors.primary,
      borderRadius: 32,
    },
  }
})``
