import { IDisciplineGroupMessage } from '@notifica-ufba/domain/entities'
import {
  ICreateDisciplineGroupMessageRepository,
  IFindAllDisciplineGroupMessageRepository,
} from '@/data/contracts'
import { FirestoreRepository } from '@/infra/database/firestore/helpers'

import { DocumentData } from 'firebase-admin/firestore'
import { ObjectId } from 'mongodb'

export class FirestoreDisciplineGroupMessageRepository
  extends FirestoreRepository
  implements
    ICreateDisciplineGroupMessageRepository,
    IFindAllDisciplineGroupMessageRepository
{
  async create({
    body,
    sentBy,
    sentById,
    disciplineGroupId,
  }: ICreateDisciplineGroupMessageRepository.Input): Promise<ICreateDisciplineGroupMessageRepository.Output> {
    const disciplineGroupMessage: IDisciplineGroupMessage = {
      id: new ObjectId().toString(),
      body: body,
      sentBy: sentBy,
      sentById: sentById,
      disciplineGroupId: disciplineGroupId,
      sentAt: new Date(),
    }

    await this.client
      .collection('disciplineGroupMessages')
      .doc(disciplineGroupId)
      .collection('messages')
      .doc()
      .set(disciplineGroupMessage)

    return disciplineGroupMessage
  }

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
      sentBy: data.sentBy,
      sentById: data.sentById,
      disciplineGroupId: data.disciplineGroupId,
      sentAt: data.sentAt.toDate(),
    }
  }
}
