import { IUser } from '@notifica-ufba/domain/entities'

import { useGetMyUser } from '@/api/user'
import { FullLoading } from '@/components'

import React, { useContext } from 'react'

export interface MeContextData {
  user: IUser | undefined
}

const MeContext = React.createContext({} as MeContextData)

export const MeProvider: React.FC = ({ children }) => {
  const { data: user, loading } = useGetMyUser()

  return (
    <FullLoading loading={loading}>
      <MeContext.Provider value={{ user }}>{children}</MeContext.Provider>
    </FullLoading>
  )
}

export const useMe = () => useContext(MeContext)
