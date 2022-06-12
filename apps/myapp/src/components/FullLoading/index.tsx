import { Spinner } from '@/components/Spinner'

import React from 'react'

import { Container } from './styles'

export interface FullLoadingProps {
  loading: boolean
}

export const FullLoading: React.FC<FullLoadingProps> = ({
  loading,
  children,
}) => {
  return loading ? (
    <Container>
      <Spinner />
    </Container>
  ) : (
    <>{children}</>
  )
}
