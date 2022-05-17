import { DisciplinesScreen } from '@/ui/screens'
import { makeDisciplinePresenter } from '@/main/factories/presenters'

import React from 'react'

export const DisciplinesScreenFactory: React.FC = () => {
  const disciplinePresenter = makeDisciplinePresenter()

  return <DisciplinesScreen presenter={disciplinePresenter} />
}
