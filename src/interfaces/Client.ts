import { ClientStateEnum } from '~/enums/ClientStateEnum'

export interface Client {
  client: any
  id: number
  description: string
  clientProfile: {
    id: number
    fullName: string
    shortName: string
    state: ClientStateEnum
    inn: number
  }
  user: { email: string }
}
