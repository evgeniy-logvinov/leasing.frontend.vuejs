import { ClientStateEnum } from '~/enums/ClientStateEnum'

export interface ClientProfile {
  id: string
  fullName: string
  shortName: string
  state: ClientStateEnum | null
  inn: string
}
