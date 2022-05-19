import { IDisciplineGroupViewModel, IDisciplineViewModel } from '@/ui/models'

export type AppNavigation = {
  DisciplinesScreen: undefined
  DisciplineGroupScreen: {
    discipline: IDisciplineViewModel
    disciplineGroup: IDisciplineGroupViewModel
  }
  LoginScreen: undefined
  RegisterScreen: undefined
  SplashScreen: undefined
  WelcomeScreen: undefined
}
