import { AxiosResponse } from 'axios'
import faker from 'faker'

export const mockAxiosHttpResponse = (
  status = faker.datatype.number(),
  data = {},
): AxiosResponse => {
  return {
    status,
    data,
  } as AxiosResponse
}
