import { DisciplineGroupScreen } from '@/ui/screens'
import { AppNavigation } from '@/ui/types/navigation'

import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'

export const DisciplineGroupScreenFactory: React.FC<
  StackScreenProps<AppNavigation, 'DisciplineGroupScreen'>
> = ({ route }) => {
  const { discipline, disciplineGroup } = route.params

  return (
    <DisciplineGroupScreen
      discipline={discipline}
      disciplineGroup={disciplineGroup}
    />
  )
}
