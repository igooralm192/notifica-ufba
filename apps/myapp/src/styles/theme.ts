import { createTheme, Colors } from '@rneui/themed'

export interface ITheme {
  mode: 'light' | 'dark'
  colors: Colors
}

const themeOptions = createTheme({
  lightColors: {
    primary: '#43C651',
    grey0: '#FAFAFA',
    grey1: '#E2E2E2',
    grey5: '#5C5C5C',
    black: '#484848',
  },
})

export { themeOptions }
