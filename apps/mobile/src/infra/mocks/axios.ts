import { AxiosResponse } from 'axios'
import faker from 'faker'

export const mockAxiosHttpResponse = (data = {}): AxiosResponse => {
  return {
    status: faker.datatype.number(),
    data,
  } as AxiosResponse
}
