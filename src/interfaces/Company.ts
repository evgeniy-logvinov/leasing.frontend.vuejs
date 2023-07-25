import { CompanyStateEnum } from '~/enums/CompanyStateEnum'

export interface Company {
  client: any
  id: number
  description: string
  companyProfile: {
    id: number
    fullName: string
    shortName: string
    state: CompanyStateEnum
    inn: number
  }
  user: { email: string }
}
