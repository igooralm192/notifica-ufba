import { IDiscipline, IDisciplineGroup } from '@notifica-ufba/domain/entities'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'

import React, { useLayoutEffect, useMemo } from 'react'

import {
  useDisciplineGroupPresenter,
  withDisciplineGroupPresenter,
} from './DisciplineGroupPresenter'
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
import { StackScreenProps } from '@react-navigation/stack'
import { AppNavigation } from '@/types/navigation'
import { useAuth } from '@/contexts/auth'

export interface DisciplineGroupScreenProps
  extends StackScreenProps<AppNavigation, 'DisciplineGroupScreen'> {}

const DisciplineGroupScreen: React.FC<DisciplineGroupScreenProps> = ({
  route,
}) => {
  const { discipline, disciplineGroup } = route.params

  const presenter = useDisciplineGroupPresenter()

  const auth = useAuth()
  const navigation = useNavigation()
  const statusBar = useStatusBar()

  const disciplineCodeFirstLetter = discipline.code.charAt(0).toUpperCase()

  const isSubscribed = useMemo(() => {
    if (!disciplineGroup.studentIds || !auth.user || !auth.user.student?.id)
      return false

    return disciplineGroup.studentIds.includes(auth.user.student.id)
  }, [disciplineGroup.studentIds, auth.user?.student?.id])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${discipline.code} - ${disciplineGroup.code}`,
    })
    statusBar.setTheme('primary')
  }, [])

  console.log(presenter.fetching)

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

      {!isSubscribed && (
        <ButtonContainer>
          <SubscribeButton
            title="Inscrever-se"
            loading={presenter.fetching}
            disabled={presenter.fetching}
            onPress={() => presenter.subscribeStudent(disciplineGroup)}
            // loadingProps={{ testID: 'login-loading' }}
          />
        </ButtonContainer>
      )}
    </Container>
  )
}

export default withDisciplineGroupPresenter(DisciplineGroupScreen)
