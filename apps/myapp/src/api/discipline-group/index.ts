import { IDisciplineGroupMessage } from '@notifica-ufba/domain/entities'
import { db } from '@/config/firebase'
import {
  DisciplineGroupMapper,
  DisciplineGroupMessageMapper,
  DisciplineGroupPostMapper,
  LastMessageMapper,
} from '@/mappers'
import { api } from '@/services/api'
import { IPaginatedList } from '@/types/list'

import { collection, doc, orderBy, query, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useFetch } from 'use-http'

import {
  IGetDisciplineGroupEndpoint,
  IGetDisciplineGroupPostsEndpoint,
  IGetDisciplineGroupsEndpoint,
  IGetMyLastMessagesEndpoint,
  ISubscribeStudentEndpoint,
} from './types'

export const getDisciplineGroups = async ({
  query,
  page,
  limit,
}: IGetDisciplineGroupsEndpoint.Request): Promise<IGetDisciplineGroupsEndpoint.Response> => {
  const response = await api.get('/discipline-groups', {
    params: {
      studentIds_has: query?.studentId || undefined,
      page,
      limit,
    },
  })

  return {
    results: DisciplineGroupMapper.toEntityList(response.data.results),
    total: response.data.total,
  }
}

export const getDisciplineGroupPosts = async (
  disciplineGroupId: string,
  { page, limit }: IGetDisciplineGroupPostsEndpoint.Request,
): Promise<IGetDisciplineGroupPostsEndpoint.Response> => {
  const response = await api.get(
    `/discipline-groups/${disciplineGroupId}/posts`,
    {
      params: {
        page,
        limit,
      },
    },
  )

  return {
    results: DisciplineGroupPostMapper.toEntityList(response.data.results),
    total: response.data.total,
  }
}

export const getMyLastMessages = async ({
  page,
  limit,
}: IGetMyLastMessagesEndpoint.Request): Promise<IGetMyLastMessagesEndpoint.Response> => {
  const response = await api.get('/discipline-groups/last-messages', {
    params: {
      page,
      limit,
    },
  })

  return {
    results: LastMessageMapper.toDTOList(response.data.results),
    total: response.data.total,
  }
}

export const subscribeStudent = async ({
  disciplineGroupId,
  studentId,
}: ISubscribeStudentEndpoint.Request): Promise<void> => {
  await api.post(`/discipline-groups/${disciplineGroupId}/subscribe`, {
    studentId,
  })
}

export const useGetDisciplineGroup = (disciplineGroupId: string) => {
  const { data, loading, error, get } =
    useFetch<IGetDisciplineGroupEndpoint.Response>(
      `/discipline-groups/${disciplineGroupId}`,
      {},
      [disciplineGroupId],
    )

  return {
    data: data
      ? DisciplineGroupMapper.toEntity(data.disciplineGroup)
      : undefined,
    loading,
    error,
    refresh: get,
  }
}

export const useGetDisciplineGroupPosts = (disciplineGroupId: string) => {
  const { data, loading, error } =
    useFetch<IGetDisciplineGroupPostsEndpoint.Response>(
      `/discipline-groups/${disciplineGroupId}/posts`,
      {},
      [disciplineGroupId],
    )

  return {
    data: {
      results: data?.results
        ? DisciplineGroupPostMapper.toEntityList(data.results)
        : [],
      total: data?.total || 0,
    },
    loading,
    error,
  }
}

export const useGetDisciplineGroupMessages = (disciplineGroupId: string) => {
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<IPaginatedList<IDisciplineGroupMessage>>({
    results: [],
    total: 0,
  })

  const getDisciplineGroupMessages = async (disciplineGroupId: string) => {
    setLoading(true)

    const docRef = doc(db, 'disciplineGroupMessages', disciplineGroupId)
    const collectionRef = collection(docRef, 'messages')
    const queryRef = query(collectionRef, orderBy('sentAt', 'desc'))

    const querySnapshot = await getDocs(queryRef)

    setData({
      results: DisciplineGroupMessageMapper.toEntityList(
        querySnapshot.docs.map(doc => doc.data()),
      ),
      total: querySnapshot.size,
    })

    setLoading(false)
  }

  useEffect(() => {
    getDisciplineGroupMessages(disciplineGroupId)
  }, [disciplineGroupId])

  // useEffect(() => {
  //   const docRef = doc(db, 'disciplineGroupMessages', disciplineGroupId)
  //   const collectionRef = collection(docRef, 'messages')
  //   const queryRef = query(collectionRef, orderBy('sentAt', 'desc'))

  //   const unsubscribe = onSnapshot(
  //     queryRef,
  //     snapshot => {
  //       handleNewMessages(
  //         DisciplineGroupMessageMapper.toEntityList(
  //           snapshot.docs.map(doc => doc.data()),
  //         ),
  //       )

  //       setLoading(false)
  //     },
  //     error => {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Erro ao retornar as mensagens desta disciplina.',
  //         text2: error.message,
  //       })
  //     },
  //   )

  //   return () => unsubscribe()
  // }, [])

  return {
    data,
    loading,
  }
}

export const useSubscribeStudent = (disciplineGroupId: string) => {
  const { post, loading, error, response } =
    useFetch<IGetDisciplineGroupEndpoint.Response>(
      `/discipline-groups/${disciplineGroupId}/subscribe`,
    )

  return {
    subscribe: post,
    loading,
    error,
    response,
  }
}
