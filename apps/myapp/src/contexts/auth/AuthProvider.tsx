import { IUser } from '@notifica-ufba/domain/entities'

import { api } from '@/services/api'

import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'

export enum AuthState {
  UNKNOWN = 'unknown',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export interface AuthContextData {
  loading: boolean
  state: AuthState
  token: string | null
  user: IUser | null

  setToken(token: string | null): void
  setUser(user: IUser | null): void
}

const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState(AuthState.UNKNOWN)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<IUser | null>(null)

  const changeToken = (token: string | null) => {
    if (token) {
      setToken(token)
      setState(AuthState.AUTHENTICATED)
    } else {
      setToken(null)
      setState(AuthState.UNAUTHENTICATED)
    }
  }

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('TOKEN')

      changeToken(token)
    }

    getToken().finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading) return

    if (token) AsyncStorage.setItem('TOKEN', token)
    else AsyncStorage.removeItem('TOKEN')
  }, [token])

  useEffect(() => {
    const interceptorId = api.interceptors.request.use(async config => {
      const token = await AsyncStorage.getItem('TOKEN')

      if (config.headers)
        config.headers.Authorization = token ? 'Bearer ' + token : ''

      return config
    })

    return () => api.interceptors.request.eject(interceptorId)
  }, [])

  // useEffect(() => {
  //   const interceptorId = api.interceptors.response.use(
  //     undefined,
  //     async (error: BaseError) => {
  //       if (error.statusCode === 401) {
  //         await logout()

  //         toast({
  //           description: error.message,
  //           status: 'error',
  //         })
  //       }

  //       return Promise.reject(error)
  //     }
  //   )

  //   return () => api.interceptors.response.eject(interceptorId)
  // }, [])

  return (
    <AuthContext.Provider
      value={{ loading, state, token, user, setToken: changeToken, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
