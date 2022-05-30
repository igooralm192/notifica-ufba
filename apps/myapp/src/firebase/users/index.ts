import { IUserDTO } from '@notifica-ufba/domain/dtos'

import { UserMapper } from '@/mappers'

import firestore from '@react-native-firebase/firestore'

export const getUserByEmail = async (
  email: string,
): Promise<IUserDTO | null> => {
  const user = await firestore()
    .collection('users')
    .doc(email)
    .get()
    .then(doc => doc.data())

  if (!user) return null

  return UserMapper.toDTO(user)
}
