import { CompanyStateEnum } from '~/enums/CompanyStateEnum'

export interface Company {
  id: number
  description: string
  companyProfile: {
    id: number
    fullName: string
    shortName: string
    state: CompanyStateEnum
    inn: number
    agreement: string
    accreditation: boolean
  }
  user: { email: string }
}
