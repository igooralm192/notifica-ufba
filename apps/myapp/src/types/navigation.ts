import { IDiscipline, IDisciplineGroup } from '@notifica-ufba/domain/entities'

export type AppNavigation = {
  DisciplinesScreen: undefined
  DisciplineGroupScreen: {
    discipline: IDiscipline
    disciplineGroup: IDisciplineGroup
  }
  DisciplineGroupMessagesScreen: {
    disciplineGroupId: string
  }
  LoginScreen: undefined
  MessagesScreen: undefined
  RegisterScreen: undefined
  SplashScreen: undefined
  WelcomeScreen: undefined
}
