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

  DisciplineGroupTabsNavigator: undefined
  DisciplineGroupPostsScreen: { disciplineGroupId: string }
  DisciplineGroupMessagesScreen: { disciplineGroupId: string }

  DisciplineGroupInfoScreen: { disciplineGroupId: string }
}
