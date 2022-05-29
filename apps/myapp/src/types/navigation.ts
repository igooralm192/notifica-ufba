import { IDiscipline, IDisciplineGroup } from '@notifica-ufba/domain/entities'

export type AppNavigation = {
  DisciplinesScreen: undefined
  DisciplineGroupScreen: {
    discipline: IDiscipline
    disciplineGroup: IDisciplineGroup
  }
  LoginScreen: undefined
  MessagesScreen: undefined
  RegisterScreen: undefined
  SplashScreen: undefined
  WelcomeScreen: undefined
}
