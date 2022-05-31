import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@notifica-ufba/errors'

import api from '@/api'
import { useAuth } from '@/contexts/auth'

import firestore from '@react-native-firebase/firestore'
import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'

export interface LoginPresenterContextData {
  loading: boolean
  login(input: IAuthenticateUserUseCase.Input): Promise<void>
}

const LoginPresenterContext = React.createContext(
  {} as LoginPresenterContextData,
)

export const LoginPresenter: React.FC = ({ children }) => {
  const auth = useAuth()

  const [loading, setLoading] = useState(false)

  const login = async ({ email, password }: IAuthenticateUserUseCase.Input) => {
    setLoading(true)

    try {
      const { token } = await api.user.login({ email, password })

      auth.setToken(token)
    } catch (err) {
      const error = err as BaseError

      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login.',
        text2: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginPresenterContext.Provider value={{ loading, login }}>
      {children}
    </LoginPresenterContext.Provider>
  )
}

export const withLoginPresenter = (Component: React.FC) => {
  return (props: any) => (
    <LoginPresenter>
      <Component {...props} />
    </LoginPresenter>
  )
}

export const useLoginPresenter = () => useContext(LoginPresenterContext)
