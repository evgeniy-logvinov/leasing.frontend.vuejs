import { TypeOfLeasingSubjectEnum } from '~/enums/TypeOfLeasingSubjectEnum'
import { TypeOfSupplierEnum } from '~/enums/TypeOfSupplierEnum'
import { CompanyProposalResult } from './CompanyProposalResult'

export interface Application {
  id: number
  isNew: boolean
  commercialProposal: CompanyProposalResult[]
  brand: string
  country: string
  returnable: boolean
  model: string
  ndsPayer: boolean
  releaseDate: string
  subjectOfLeasing: TypeOfLeasingSubjectEnum
  typeOfSupplier: TypeOfSupplierEnum
}
