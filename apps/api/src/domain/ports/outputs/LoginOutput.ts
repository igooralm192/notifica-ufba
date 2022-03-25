export interface ILoginOutput {
  token: string
  user: {
    id: number
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
  }
}
