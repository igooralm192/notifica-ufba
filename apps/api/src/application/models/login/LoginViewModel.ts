import { ILoginOutput } from '@/domain/ports/outputs'

export class LoginViewModel {
  static toJSON({ token, user }: ILoginOutput) {
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt.toISOString(),
        updated_at: user.updatedAt.toISOString(),
      },
    }
  }
}
