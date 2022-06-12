import React from 'react'

import { Container, Title } from './DisciplineGroupChatStyles'

export interface DisciplineGroupChatTabProps {}

const DisciplineGroupChatTab: React.FC<DisciplineGroupChatTabProps> = props => {
  return (
    <Container>
      <Title>Chat</Title>
    </Container>
  )
}

export default DisciplineGroupChatTab
