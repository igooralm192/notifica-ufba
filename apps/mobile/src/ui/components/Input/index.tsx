import { IUseFormControlData } from '@/presentation/protocols'
import { useLogin } from '@/ui/contexts'

import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'

export type IInputProps = IUseFormControlData & Omit<TextInputProps, 'onChange'>

const Input: React.FC<IInputProps> = ({ onChange, ...props }) => {
  // const {
  //   field: { onBlur, name, value, ref },
  //   fieldState: { invalid, isTouched, isDirty },
  //   formState: { touchedFields, dirtyFields },
  // } = useController(props)

  return <TextInput onChangeText={onChange} {...props} />
}

// label: field.label,
//       placeholder: field.placeholder,
//       value: values[fieldKey],
//       onChangeText: handleChange(fieldKey),
//       onBlur: handleBlur(fieldKey),
//       onSubmitEditing: onSubmitEditing,
//       touched: touched[fieldKey] as boolean,
//       helperText: errors[fieldKey] as string,
//       required: field.required,
//       textArea: field.multiline,
//       disabled: field.disabledIfCoworker && isCoworker,
//       keyboardType: resolveKeyboardType(field.type),
//       testID: `add-collection-document-${fieldKey}`,

export default Input
