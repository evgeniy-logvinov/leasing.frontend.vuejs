import { ClientStateEnum } from '~/enums/ClientStateEnum'

export interface Client {
  client: any
  id: string
  description: string
  clientProfile: {
    id: string
    fullName: string
    shortName: string
    state: ClientStateEnum
    inn: number
  }
  user: { email: string }
}
