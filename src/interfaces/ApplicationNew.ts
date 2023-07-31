import { TypeOfLeasingSubjectEnum } from '~/enums/TypeOfLeasingSubjectEnum'
import { TypeOfSupplierEnum } from '~/enums/TypeOfSupplierEnum'

export interface ApplicationNew {
  isNew: boolean
  brand: string
  country: string
  returnable: boolean
  model: string
  ndsPayer: boolean
  releaseDate: string
  subjectOfLeasing: TypeOfLeasingSubjectEnum | null
  typeOfSupplier: TypeOfSupplierEnum | null
}
