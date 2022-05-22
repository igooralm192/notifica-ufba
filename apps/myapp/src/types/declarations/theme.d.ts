import { ITheme } from '@/ui/theme'

declare module 'styled-components/native' {
  export interface DefaultTheme extends ITheme {}
}
