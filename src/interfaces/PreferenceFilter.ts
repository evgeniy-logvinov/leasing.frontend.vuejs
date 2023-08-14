import { CityOfPresenceCustomerCoverageArea } from './CityOfPresenceCustomerCoverageArea'
import { Gk } from './Gk'
import { SubjectGuarantee } from './SubjectGuarantee'
import { TypesOfFinancedHolding } from './TypesOfFinancedHolding'

export interface PreferenceFilter {
  cityOfPresenceCustomerCoverageArea: CityOfPresenceCustomerCoverageArea[]
  gk: Gk
  typesOfFinancedHoldings: TypesOfFinancedHolding[]
  subjectGuarantee: SubjectGuarantee
}
