import { IDisciplineViewModel } from '@/ui/models'
import { ListItem } from '@rneui/themed'
import React, { useState } from 'react'

import {
  DisciplineCode,
  DisciplineName,
  DisciplineGroupCode,
  DisciplineGroupTeacher,
} from './DisciplinesListItemStyles'

export interface DisciplinesListItemProps {
  discipline: IDisciplineViewModel
}

const DisciplinesListItem: React.FC<DisciplinesListItemProps> = props => {
  const [expanded, setExpanded] = useState(false)

  return (
    <ListItem.Accordion
      isExpanded={expanded}
      containerStyle={{ paddingHorizontal: 16 }}
      content={
        <ListItem.Content>
          <DisciplineCode>MATA02</DisciplineCode>
          <DisciplineName>Cálculo A</DisciplineName>
        </ListItem.Content>
      }
      onPress={() => setExpanded(!expanded)}
    >
      <ListItem containerStyle={{ paddingHorizontal: 16 }}>
        <ListItem.Content>
          <DisciplineGroupCode>T01000</DisciplineGroupCode>
          <DisciplineGroupTeacher>Professor</DisciplineGroupTeacher>
        </ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  )
}

export default DisciplinesListItem
