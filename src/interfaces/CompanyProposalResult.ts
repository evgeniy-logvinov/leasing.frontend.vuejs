import { Company } from './Company'

export interface CompanyProposalResult {
  id: number
  leasingCompany: Company
  result: 'APPROVED' | 'NOT_APPROVED'
  topFive: 'YES' | 'NO' | 'UNKNOWN'
  analitic: { id: number; firstName: string }
  created: string
  manager: { id: number; firstName: string }
}
