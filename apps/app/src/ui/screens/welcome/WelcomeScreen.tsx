import WelcomePNG from '@/ui/assets/welcome.png'
import { useNavigation } from '@/ui/helpers'

import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  Container,
  Title,
  Subtitle,
  ImageContainer,
  WelcomeImage,
  ButtonsContainer,
  ButtonContainer,
  LoginButton,
  RegisterButton,
} from './WelcomeStyles'

const WelcomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const navigateToLogin = () => navigation.navigate('LoginScreen')

  return (
    <Container style={{ marginTop: insets.top }}>
      <Title>Bem vindo!</Title>

      <Subtitle>
        Fique por dentro das últimas mensagens postadas pelos seus professores!
      </Subtitle>

      <ImageContainer>
        <WelcomeImage source={WelcomePNG} />
      </ImageContainer>

      <ButtonsContainer>
        <ButtonContainer>
          <LoginButton title="Entrar" onPress={navigateToLogin} />
        </ButtonContainer>
        <ButtonContainer>
          <RegisterButton title="Cadastrar" />
        </ButtonContainer>
      </ButtonsContainer>
    </Container>
  )
}

export default WelcomeScreen
