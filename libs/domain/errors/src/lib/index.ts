import * as AuthenticateUserError from './authenticate-user'
import * as CommonError from './common'
import * as CreateStudentError from './create-student'
import * as CreateUserError from './create-user'

export { StudentDoesNotExistError } from './student/StudentDoesNotExistError'
export { DisciplineGroupDoesNotExistError } from './discipline-group/DisciplineGroupDoesNotExistError'
export { StudentAlreadySubscribedError } from './discipline-group/StudentAlreadySubscribedError'

export {
  AuthenticateUserError,
  CommonError,
  CreateStudentError,
  CreateUserError,
}
