import { CompanyStateEnum } from '~/enums/CompanyStateEnum'

export interface CompanyProfile {
  id: string
  fullName: string
  shortName: string
  state: CompanyStateEnum | null
  inn: string
  agreement: string
  accreditation: boolean
}
