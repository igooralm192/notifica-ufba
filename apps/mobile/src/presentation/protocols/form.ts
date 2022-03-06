export interface IUseFormControlData {
  onChange: (text: string) => void
}

export type IUseFormControl = () => IUseFormControlData

export interface IUseFormData {
  onSubmit: () => void
  register: (name: string) => IUseFormControlData
}

export type IUseForm = () => IUseFormData
