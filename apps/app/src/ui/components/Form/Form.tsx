import React from 'react'
import { Keyboard, KeyboardAvoidingView } from 'react-native'

import { Container } from './FormStyles'

export interface FormProps {}

const Form: React.FC<FormProps> = ({ children }) => {
  return (
    <KeyboardAvoidingView behavior="position">
      <Container
        contentInsetAdjustmentBehavior="automatic"
        overScrollMode="always"
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
      >
        {children}
      </Container>
    </KeyboardAvoidingView>
  )
}

export default Form
