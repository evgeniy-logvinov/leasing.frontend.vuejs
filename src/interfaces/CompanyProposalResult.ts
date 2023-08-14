import { Company } from './Company'

export interface CompanyProposalResult {
  id: string
  leasingCompany: Company
  result: 'APPROVED' | 'NOT_APPROVED'
  topFive: 'YES' | 'NO' | 'UNKNOWN'
  analitic: { id: string; firstName: string }
  created: string
  manager: { id: string; firstName: string }
}
