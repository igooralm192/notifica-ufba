import { ISubscribeStudentToDisciplineGroupController } from '@/application/controllers/discipline-group'

import faker from 'faker'

export const mockSubscribeStudentToDisciplineGroupBody =
  (): ISubscribeStudentToDisciplineGroupController.Body => {
    return { studentId: faker.datatype.uuid() }
  }

export const mockSubscribeStudentToDisciplineGroupParams =
  (): ISubscribeStudentToDisciplineGroupController.Params => {
    return { disciplineGroupId: faker.datatype.uuid() }
  }
