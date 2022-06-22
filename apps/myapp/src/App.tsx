import { CommonError } from '@notifica-ufba/domain/errors'
import { BaseError } from '@notifica-ufba/errors'

import { AllProviders } from '@/components'
import env from '@/config/env'
import Routes from '@/routes'

import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import Toast from 'react-native-toast-message'
import { Options, Provider as HttpProvider } from 'use-http'

const options: Partial<Options> = {
  interceptors: {
    request: async ({ options }) => {
      const token = await AsyncStorage.getItem('TOKEN')

      if (options.headers)
        // @ts-ignore
        options.headers.Authorization = token ? 'Bearer ' + token : ''

      return options
    },
    response: async ({ response }) => {
      if (response.status < 400) {
        return response
      }

      if (!response.data?.code || !response?.data?.message) {
        throw new CommonError.InternalServerError(new Error())
      }

      throw new BaseError(
        response?.data?.code,
        response?.data?.message,
        response?.data?.context,
        response?.data?.stack,
      )
    },
  },
  onError: ({ error }) => {
    Toast.show({
      type: 'error',
      text1: 'Erro na requisição.',
      text2: error.message,
    })
  },
}

const App: React.FC = () => {
  return (
    <HttpProvider url={env.API_URL} options={options}>
      <AllProviders>
        <Routes />
      </AllProviders>
    </HttpProvider>
  )
}

export default App
