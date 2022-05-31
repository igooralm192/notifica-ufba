import { IUser } from '@notifica-ufba/domain/entities'

import api from '@/api'
import { useDispatch, useSelector, listenerMiddleware } from '@/store'
import {
  cleanAuth,
  stateChanged,
  tokenFetched,
  userFetched,
} from '@/store/auth'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { isAnyOf } from '@reduxjs/toolkit'
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
}

const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const { state, token, user } = useSelector(state => state.auth)

  const [loading, setLoading] = useState(false)

  const changeToken = (token: string | null) => {
    dispatch(tokenFetched(token))
  }

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('TOKEN')

      changeToken(token)
    }

    getToken()
  }, [])

  useEffect(() => {
    const unsubscribe = listenerMiddleware.startListening({
      predicate: (_, currentState, prevState) => {
        return (
          prevState.auth.state !== currentState.auth.state &&
          currentState.auth.state === AuthState.AUTHENTICATED
        )
      },
      effect: async (_, { dispatch }) => {
        setLoading(true)

        await api.user
          .getMyUser()
          .then(({ user }) => dispatch(userFetched(user)))
          .finally(() => setLoading(false))
      },
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = listenerMiddleware.startListening({
      matcher: isAnyOf(tokenFetched, cleanAuth),
      effect: action => {
        const token = action.payload

        if (token) dispatch(stateChanged(AuthState.AUTHENTICATED))
        else dispatch(stateChanged(AuthState.UNAUTHENTICATED))
      },
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (token) AsyncStorage.setItem('TOKEN', token)
    else AsyncStorage.removeItem('TOKEN')
  }, [token])

  useEffect(() => {
    const interceptorId = api.instance.interceptors.request.use(
      async config => {
        const token = await AsyncStorage.getItem('TOKEN')

        if (config.headers)
          config.headers.Authorization = token ? 'Bearer ' + token : ''

        return config
      },
    )

    return () => api.instance.interceptors.request.eject(interceptorId)
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
      value={{ loading, state, token, user, setToken: changeToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
