import '@testing-library/jest-native/extend-expect'

// @ts-ignore
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

jest.mock('@expo-google-fonts/quicksand', () => ({
  useFonts: () => [true],
}))
