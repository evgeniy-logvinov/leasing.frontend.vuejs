import { CompanyStateEnum } from '~/enums/CompanyStateEnum'

export interface Company {
  id: string
  description: string
  companyProfile: {
    id: string
    fullName: string
    shortName: string
    state: CompanyStateEnum
    inn: number
    agreement: string
    accreditation: boolean
  }
  user: { email: string }
}
