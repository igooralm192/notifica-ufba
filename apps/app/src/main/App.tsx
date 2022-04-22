import { AllProviders } from '@/ui/components'
import Routes from '@/main/routes'
import { StatusBar } from 'react-native'

const App: React.FC = () => {
  return (
    <AllProviders>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Routes />
    </AllProviders>
  )
}

export default App
