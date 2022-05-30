import { IUserDTO } from '@notifica-ufba/domain/dtos'

import api from '@/api'
import firebase from '@/firebase'
import { UserMapper } from '@/mappers'
import { useDispatch, useSelector, listenerMiddleware } from '@/store'
import {
  cleanAuth,
  stateChanged,
  tokenFetched,
  userFetched,
} from '@/store/auth'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
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
  user: IUserDTO | null

  login(email: string, password: string): Promise<void>
  register(email: string, password: string): Promise<void>
}

const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const { state, user } = useSelector(state => state.auth)

  const [loading, setLoading] = useState(false)

  const changeToken = (token: string | null) => {
    dispatch(tokenFetched(token))
  }

  const login = async (email: string, password: string) => {
    setLoading(true)

    const { user } = await auth().signInWithEmailAndPassword(email, password)

    if (user) {
      const token = await user.getIdToken()

      changeToken(token)
    }

    setLoading(false)
  }

  const register = async (email: string, password: string) => {
    setLoading(true)

    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password,
    )

    if (user) {
      const token = await user.getIdToken()

      changeToken(token)
    }

    setLoading(false)
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken()

        changeToken(token)
      } else {
        changeToken(null)
      }
    })

    return () => unsubscribe()
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
        const email = auth().currentUser?.email

        if (!email) return

        setLoading(true)
        await firebase.users
          .getUserByEmail(email)
          .then(user => dispatch(userFetched(user)))
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
    const interceptorId = api.instance.interceptors.request.use(
      async config => {
        const token = await auth().currentUser?.getIdToken()

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
      value={{
        loading,
        state,
        user,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
