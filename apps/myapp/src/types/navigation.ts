export type AppNavigation = {
  // Unknown
  SplashScreen: undefined

  // Unauthenticated
  WelcomeScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined

  // Authenticated
  BottomTabsNavigator: undefined
  LastMessagesScreen: undefined
  DisciplinesScreen: undefined
  DisciplineGroupsScreen: undefined

  DisciplineGroupTabsScreen: { disciplineGroupId: string }
  DisciplineGroupPostsScreen: { disciplineGroupId: string }
  DisciplineGroupMessagesScreen: { disciplineGroupId: string }

  DisciplineGroupInfoScreen: { disciplineGroupId: string }
}
