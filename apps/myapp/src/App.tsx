import { AllProviders } from '@/components'
import Routes from '@/routes'

import firestore from '@react-native-firebase/firestore'
import React, { useEffect } from 'react'

const App: React.FC = () => {
  const getMessages = async () => {
    const groups = await firestore().collection('disciplineGroups').get()

    console.log(groups)
  }

  useEffect(() => {
    getMessages()
  }, [])

  return (
    <AllProviders>
      <Routes />
    </AllProviders>
  )
}

export default App
