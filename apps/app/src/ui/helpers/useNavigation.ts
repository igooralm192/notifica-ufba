import { AppNavigation } from '@/ui/types/navigation'
import {
  NavigationProp,
  useNavigation as useDefaultNavigation,
} from '@react-navigation/native'

export const useNavigation = () =>
  useDefaultNavigation<NavigationProp<AppNavigation>>()
