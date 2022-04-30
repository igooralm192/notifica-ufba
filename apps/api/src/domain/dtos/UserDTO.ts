export interface IUserDTO {
  id: string
  name: string
  email: string
  type: 'STUDENT' | 'TEACHER'
  createdAt: Date
  updatedAt: Date
}
