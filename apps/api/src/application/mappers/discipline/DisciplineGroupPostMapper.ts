import { IDisciplineGroupPostDTO } from '@notifica-ufba/domain/dtos'
import { IDisciplineGroupPost } from '@notifica-ufba/domain/entities'

import { DisciplineGroupMapper } from '../discipline/DisciplineGroupMapper'
import { UserMapper } from '../user/UserMapper'

export class DisciplineGroupPostMapper {
  static toDTO(post: IDisciplineGroupPost): IDisciplineGroupPostDTO {
    return {
      id: post.id,
      title: post.title,
      content: post.content,

      authorId: post.authorId,
      disciplineGroupId: post.disciplineGroupId,

      author: post.author ? UserMapper.toDTO(post.author) : undefined,
      disciplineGroup: post.disciplineGroup
        ? DisciplineGroupMapper.toDTO(post.disciplineGroup)
        : undefined,

      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }
}
