import { CriteriaFinancedHolding } from './CriteriaFinancedHolding'

export interface TypesOfFinancedHolding {
  id: string

  name: string

  selected: boolean

  newCriteria: CriteriaFinancedHolding

  previouslyUsedCriteria: CriteriaFinancedHolding

  returnableCriteria: CriteriaFinancedHolding
}
