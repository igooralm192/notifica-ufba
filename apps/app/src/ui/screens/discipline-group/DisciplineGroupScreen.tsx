import { useStatusBar } from '@/ui/contexts/status-bar'
import { useNavigation } from '@/ui/helpers'
import { IDisciplineGroupViewModel, IDisciplineViewModel } from '@/ui/models'
// import { IDisciplinePresenter } from '@/ui/presenters'
import { observer } from 'mobx-react'
import React, { useLayoutEffect } from 'react'

import {
  Container,
  ScrollContainer,
  InitialLetterContainer,
  InitialLetter,
  TitleContainer,
  DisciplineCode,
  GroupCode,
  Name,
  DescriptionContainer,
  DescriptionLabel,
  Description,
  TeacherContainer,
  TeacherLabel,
  TeacherName,
  MenuContainer,
  MenuLabel,
  MenuUrl,
  ClassSchedulesContainer,
  ClassSchedulesLabel,
  ClassSchedule,
  ButtonContainer,
  SubscribeButton,
} from './DisciplineGroupStyles'

export interface DisciplineGroupScreenProps {
  discipline: IDisciplineViewModel
  disciplineGroup: IDisciplineGroupViewModel
}

const DisciplineGroupScreen: React.FC<DisciplineGroupScreenProps> = ({
  discipline,
  disciplineGroup,
}) => {
  const navigation = useNavigation()
  const statusBar = useStatusBar()

  const disciplineCodeFirstLetter = discipline.code.charAt(0).toUpperCase()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${discipline.code} - ${disciplineGroup.code}`,
    })
    statusBar.setTheme('primary')
  }, [])

  return (
    <Container>
      <ScrollContainer>
        <InitialLetterContainer>
          <InitialLetter>{disciplineCodeFirstLetter}</InitialLetter>
        </InitialLetterContainer>

        <TitleContainer>
          <DisciplineCode>{discipline.code}</DisciplineCode>
          <Name>{discipline.name}</Name>
          <GroupCode>{disciplineGroup.code}</GroupCode>
        </TitleContainer>

        <DescriptionContainer>
          <DescriptionLabel>Descrição</DescriptionLabel>
          <Description>{disciplineGroup.description}</Description>
        </DescriptionContainer>

        <TeacherContainer>
          <TeacherLabel>Professor</TeacherLabel>
          <TeacherName>{disciplineGroup.teacher?.user?.name}</TeacherName>
        </TeacherContainer>

        <MenuContainer>
          <MenuLabel>Link da ementa</MenuLabel>
          <MenuUrl>{disciplineGroup.menuUrl}</MenuUrl>
        </MenuContainer>

        <ClassSchedulesContainer>
          <ClassSchedulesLabel>Horários</ClassSchedulesLabel>
          <ClassSchedule>{disciplineGroup.classTime}</ClassSchedule>
        </ClassSchedulesContainer>
      </ScrollContainer>

      <ButtonContainer>
        <SubscribeButton
          title="Inscrever-se"
          // loading={presenter.loading}
          // disabled={presenter.loading || form.formState.isSubmitting}
          // onPress={submitForm}
          // loadingProps={{ testID: 'login-loading' }}
        />
      </ButtonContainer>
    </Container>
  )
}

export default observer(DisciplineGroupScreen)
