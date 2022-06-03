import { IDisciplineGroupMessage } from '@notifica-ufba/domain/entities'

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export class DisciplineGroupMessageMapper {
  static toEntity(
    data: FirebaseFirestoreTypes.DocumentData,
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

  static toEntityList(
    data: FirebaseFirestoreTypes.DocumentData[],
  ): IDisciplineGroupMessage[] {
    return data.map((item: FirebaseFirestoreTypes.DocumentData) =>
      DisciplineGroupMessageMapper.toEntity(item),
    )
  }
}
