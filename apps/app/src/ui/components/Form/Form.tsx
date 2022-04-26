import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native'

import { Container } from './FormStyles'

export interface FormProps {}

const Form: React.FC<FormProps> = ({ children }) => {
  return (
    <Container
      keyboardShouldPersistTaps="handled"
      onScrollBeginDrag={Keyboard.dismiss}
    >
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.select({
          ios: 120,
          android: 10,
        })}
      >
        {children}
      </KeyboardAvoidingView>
    </Container>
  )
}

export default Form
