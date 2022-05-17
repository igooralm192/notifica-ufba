export interface IUserViewModel {
  id: string
  name: string
  email: string
  type: 'STUDENT' | 'TEACHER'
  createdAt: string
  updatedAt: string
}
