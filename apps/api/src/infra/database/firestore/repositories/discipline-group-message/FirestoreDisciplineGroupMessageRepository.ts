import { IDisciplineGroupMessage } from '@notifica-ufba/domain/entities'
import {
  IDisciplineGroupMessageRepositoryListInput,
  IFindAllDisciplineGroupMessageRepository,
} from '@/data/contracts'
import { FirestoreRepository } from '@/infra/database/firestore/helpers'

import { DocumentData } from 'firebase-admin/firestore'

export class FirestoreDisciplineGroupMessageRepository
  extends FirestoreRepository
  implements IFindAllDisciplineGroupMessageRepository
{
  async findAll({
    disciplineGroupId,
    listInput,
  }: IFindAllDisciplineGroupMessageRepository.Input): Promise<IFindAllDisciplineGroupMessageRepository.Output> {
    const { take, skip } = listInput

    let query = this.client
      .collection('disciplineGroupMessages')
      .doc(disciplineGroupId)
      .collection('messages')
      .orderBy('sentAt', 'desc')

    if (take) query = query.limit(take)
    if (skip) query = query.offset(skip)

    return query.get().then(snapshot => {
      const disciplineGroupMessages = snapshot.docs.map(doc => doc.data())

      return {
        results: disciplineGroupMessages.map(
          this.mapDocumentDataToDisciplineGroupMessage,
        ),
        total: snapshot.size,
      }
    })
  }

  private mapDocumentDataToDisciplineGroupMessage(
    data: DocumentData,
  ): IDisciplineGroupMessage {
    return {
      id: data.id,
      body: data.body,
      disciplineGroupId: data.disciplineGroupId,
      sentBy: data.sentBy,
      sentAt: data.sentAt.toDate(),
    }
  }
}
