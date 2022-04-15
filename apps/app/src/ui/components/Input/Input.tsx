import { InputProps as RNEInputProps } from '@rneui/themed'
import React from 'react'

import { Container } from './InputStyles'

export interface InputProps extends Omit<RNEInputProps, 'shake'> {}

const Input: React.FC<InputProps> = props => {
  return <Container {...props} shake={() => console.log('SHAKED')} />
}

export default Input
